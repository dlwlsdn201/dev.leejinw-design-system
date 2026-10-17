#!/usr/bin/env bash
#
# 하네스 기계적 게이트 — tsc(baseline diff) · lint(변경 파일) · test
#
# 목적: 에이전트 세션이 매 라운드 전체 로그를 컨텍스트로 끌어오지 않도록,
#       판정에 필요한 요약만 출력한다. 상세 로그는 .gate/ 에 남긴다.
#
# 사용법:
#   bash scripts/gate.sh                 # tsc + lint + test
#   bash scripts/gate.sh --skip-test     # tsc + lint 만 (편집 중 빠른 확인)
#   bash scripts/gate.sh --update-baseline   # 현재 tsc 에러를 baseline으로 재스냅샷
#
# 종료 코드: 0 = 통과(신규 에러 0건) / 1 = 신규 에러 존재
#
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

GATE_DIR="$ROOT/.gate"
BASELINE="$ROOT/scripts/tsc-baseline.txt"
mkdir -p "$GATE_DIR"

SKIP_TEST=0
UPDATE_BASELINE=0
for arg in "$@"; do
  case "$arg" in
    --skip-test) SKIP_TEST=1 ;;
    --update-baseline) UPDATE_BASELINE=1 ;;
    *) echo "알 수 없는 옵션: $arg" >&2; exit 2 ;;
  esac
done

# ── Node 버전 고정 ────────────────────────────────────────────────
# 셸 기본 Node가 engines와 다르면 pnpm이 ERR_PNPM_UNSUPPORTED_ENGINE으로 즉시 종료된다.
# 이 경우 타입 검사가 아예 수행되지 않으므로 "에러 없음"으로 오판하기 쉽다 — 여기서 차단한다.
REQUIRED_NODE="$(node -e "process.stdout.write(require('./package.json').engines.node)" 2>/dev/null || echo '')"
if [ -n "$REQUIRED_NODE" ] && [ -d "$HOME/.nvm/versions/node/v$REQUIRED_NODE/bin" ]; then
  export PATH="$HOME/.nvm/versions/node/v$REQUIRED_NODE/bin:$PATH"
fi
CURRENT_NODE="$(node -v 2>/dev/null | sed 's/^v//')"
if [ -n "$REQUIRED_NODE" ] && [ "$CURRENT_NODE" != "$REQUIRED_NODE" ]; then
  echo "GATE: FAIL — Node 버전 불일치 (필요 $REQUIRED_NODE / 현재 ${CURRENT_NODE:-없음})"
  echo "      nvm install $REQUIRED_NODE 후 다시 실행하세요. 이 상태로는 tsc가 수행되지 않습니다."
  exit 1
fi

# tsc 에러 라인에서 (line,col)을 제거해 baseline 비교 키로 쓴다.
# 무관한 편집으로 줄 번호만 밀렸을 때 '신규 에러'로 오탐하는 것을 막는다.
normalize() { grep -E 'error TS[0-9]+' | sed -E 's/\(([0-9]+),([0-9]+)\)//' | sort -u; }

# ── 1) tsc ───────────────────────────────────────────────────────
pnpm tsc --noEmit > "$GATE_DIR/tsc.log" 2>&1
normalize < "$GATE_DIR/tsc.log" > "$GATE_DIR/tsc.normalized"

if [ "$UPDATE_BASELINE" -eq 1 ]; then
  cp "$GATE_DIR/tsc.normalized" "$BASELINE"
  echo "GATE: baseline 갱신 완료 — $(wc -l < "$BASELINE" | tr -d ' ')건 (scripts/tsc-baseline.txt)"
  exit 0
fi

[ -f "$BASELINE" ] || : > "$BASELINE"
comm -23 "$GATE_DIR/tsc.normalized" "$BASELINE" > "$GATE_DIR/tsc.new"
comm -13 "$GATE_DIR/tsc.normalized" "$BASELINE" > "$GATE_DIR/tsc.fixed"

TSC_TOTAL=$(wc -l < "$GATE_DIR/tsc.normalized" | tr -d ' ')
TSC_NEW=$(wc -l < "$GATE_DIR/tsc.new" | tr -d ' ')
TSC_FIXED=$(wc -l < "$GATE_DIR/tsc.fixed" | tr -d ' ')

# ── 2) lint (변경 파일 한정) ──────────────────────────────────────
CHANGED=$(git diff --name-only --diff-filter=ACM HEAD -- '*.ts' '*.tsx' 2>/dev/null; \
          git ls-files --others --exclude-standard -- '*.ts' '*.tsx' 2>/dev/null)
CHANGED=$(echo "$CHANGED" | sed '/^$/d' | sort -u)

if [ -z "$CHANGED" ]; then
  LINT_STATUS="SKIP (변경 파일 없음)"
  LINT_FAIL=0
else
  # shellcheck disable=SC2086
  pnpm eslint $CHANGED > "$GATE_DIR/lint.log" 2>&1
  LINT_FAIL=$?
  LINT_COUNT=$(grep -cE '^\s+[0-9]+:[0-9]+' "$GATE_DIR/lint.log" || true)
  if [ "$LINT_FAIL" -eq 0 ]; then
    LINT_STATUS="PASS ($(echo "$CHANGED" | wc -l | tr -d ' ')개 파일)"
  else
    LINT_STATUS="FAIL (${LINT_COUNT}건) → .gate/lint.log"
  fi
fi

# ── 3) test ──────────────────────────────────────────────────────
# 주의: `pnpm test`는 Vitest UI(watch)라 종료되지 않는다. 게이트는 `test:once`를 쓴다.
TEST_FAIL=0
if [ "$SKIP_TEST" -eq 1 ]; then
  TEST_STATUS="SKIP (--skip-test)"
else
  pnpm test:once --silent > "$GATE_DIR/test.log" 2>&1
  TEST_FAIL=$?
  TEST_SUMMARY=$(grep -E '^\s*(Test Files|Tests)\s' "$GATE_DIR/test.log" | tr '\n' ' ' | sed -E 's/\s+/ /g')
  if [ "$TEST_FAIL" -eq 0 ]; then
    TEST_STATUS="PASS — ${TEST_SUMMARY:-요약 없음}"
  else
    TEST_STATUS="FAIL — ${TEST_SUMMARY:-요약 없음} → .gate/test.log"
  fi
fi

# ── 결과 요약 ────────────────────────────────────────────────────
echo "GATE ─────────────────────────────────────────"
echo "tsc  : 신규 ${TSC_NEW}건 / baseline ${TSC_TOTAL}건 중 기존 $((TSC_TOTAL - TSC_NEW))건$([ "$TSC_FIXED" -gt 0 ] && echo " / 해소 ${TSC_FIXED}건")"
[ "$TSC_NEW" -gt 0 ] && sed 's/^/       ▸ /' "$GATE_DIR/tsc.new"
echo "lint : $LINT_STATUS"
echo "test : $TEST_STATUS"

if [ "$TSC_NEW" -gt 0 ] || [ "$LINT_FAIL" -ne 0 ] || [ "$TEST_FAIL" -ne 0 ]; then
  echo "판정 : FAIL"
  exit 1
fi
echo "판정 : PASS (tsc는 baseline FAIL 유지 — 신규 직접 에러 0건)"
