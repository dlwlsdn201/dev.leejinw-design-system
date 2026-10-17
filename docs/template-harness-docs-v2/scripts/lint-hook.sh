#!/usr/bin/env bash
#
# PostToolUse(Edit|Write) hook — 편집된 .ts/.tsx 파일만 eslint 검사.
# 통과 시 아무것도 출력하지 않는다(토큰 0). 실패 시에만 결과를 노출한다.
#
# stdin: Claude Code hook payload(JSON)
#
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

FILE="$(jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)"
[ -n "$FILE" ] || exit 0

case "$FILE" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;
esac
case "$FILE" in
  "$ROOT"/*) ;;
  *) exit 0 ;;   # 이 저장소 밖 파일은 검사하지 않는다
esac
[ -f "$FILE" ] || exit 0

# engines에 고정된 Node로 실행 (셸 기본 Node가 다르면 pnpm이 즉시 실패한다)
REQUIRED_NODE="$(node -e "process.stdout.write(require('$ROOT/package.json').engines.node)" 2>/dev/null || echo '')"
if [ -n "$REQUIRED_NODE" ] && [ -d "$HOME/.nvm/versions/node/v$REQUIRED_NODE/bin" ]; then
  export PATH="$HOME/.nvm/versions/node/v$REQUIRED_NODE/bin:$PATH"
fi

OUT="$(cd "$ROOT" && pnpm eslint "$FILE" 2>&1)"
STATUS=$?

[ "$STATUS" -eq 0 ] && exit 0

printf 'eslint 실패 — %s\n%s\n' "${FILE#"$ROOT"/}" "$OUT"
exit 0
