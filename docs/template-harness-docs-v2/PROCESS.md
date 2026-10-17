# AI 하네스 프로세스 v2 (2026, Claude 5 / Codex GPT-5 기준)

## 문서 구조 (4개 + 아카이브)

```
/docs
  PRD.md            # 전체 목표 PRD — Codex 소유
  TASK_PLAN.md      # 현재 단위 작업 플랜 + 완료 기준(AC) — Codex 소유
  TASK_RESULT.md    # 작업 결과 + 중단 시 체크포인트 (통합) — Claude 소유
  REVIEW.md         # 심각도 기반 리뷰 결과 — Codex 소유
  /archive/{issue-code}/   # 커밋 시점에 TASK_RESULT, REVIEW 이동
```

네이밍 원칙:
- 하네스 **상태 문서는 `.md`** — `.mdc`는 Cursor rules 전용으로 남겨,
  "규칙(.mdc) vs 작업 상태(.md)" 구분 자체를 컨벤션으로 삼는다.
- `TASK_PLAN`(현재 진행 중인 플랜) ↔ `TASK_RESULT`(그 결과) ↔ `REVIEW`(그 판정)
  — 세 문서가 같은 단위 작업 하나를 가리키는 한 세트다.

구조 변경점 (v1 대비):
- **PROCEED_TASK_RESULT + RECENT_TASK_CHECKPOINT → TASK_RESULT.md 하나로 통합.**
  체크포인트는 작업이 중간에 끊길 때만 TASK_RESULT 하단의 `## 체크포인트` 섹션에 기록.
- **아카이브 규칙 신설**: 단위 작업 커밋 완료 시 TASK_RESULT·REVIEW를
  `/docs/archive/{issue-code}/`로 이동하고 본 문서는 비움. 낡은 이력이
  다음 세션 컨텍스트를 오염시키는 것을 차단.
- 모든 문서는 **현재 단위 작업만** 담는다. 이력은 아카이브와 git이 담당.

## 역할

| 에이전트 | 역할 | 소유 문서 |
|---|---|---|
| Codex | 요구사항 분석·설계·AC 정의·**최종 PASS 판정** | PRD, TASK_PLAN, REVIEW |
| Claude Code | 구현·자체 검증·**기계적 게이트 통과**·1차 자체 리뷰 | TASK_RESULT |

토큰 절약 원칙: Blocker/Major 수정 반영 등 초기 라운드는 Claude Code에서
하위 모델(Sonnet)로 돌려도 무방. **Codex(교차 모델) 리뷰는 최종 판정에 집중.**
Codex가 코드를 직접 작성한 작업은 Claude가 리뷰 역할을 맡아 교차 검증 구조를 유지.

### 에이전트(세션)별 역할

| 에이전트(세션명) | 역할 | 소유 문서 |
|---|---|---|
| {이슈코드}-{feature/bugfix}--admin | 요구사항 분석·설계·AC 정의·**최종 PASS 판정** | PRD, TASK_PLAN, REVIEW |
| {이슈코드}-{feature/bugfix}--dev | 구현·자체 검증·**기계적 게이트 통과**·1차 자체 리뷰 | TASK_RESULT |
| {이슈코드}-{feature/bugfix}--dev2 | dev 세션이 해야할 작업들 중 병렬로 진행할 수 있는 단위 작업들을 진행하는 서브 구현 세션. | TASK_RESULT |
| {이슈코드}-{feature/bugfix}--reviewer | codex-cc 플러그인 기반의 교차 검증 리뷰어. codex-cc 으로 codex에게 리뷰를 요청하고 결과를 REVIEW.md 문서에 기록. | REVIEW |

## 프로세스

```
1. [Codex] 요구사항 분석 → PRD 갱신 → TASK_PLAN 작성
          ※ 각 단위 작업에 완료 기준(AC) 체크리스트 필수 포함

2. [Claude] TASK_PLAN 기반 구현
   완료 조건(문서 작성 전 필수, 순서대로):
     a. 자체 E2E/수동 검증
     b. 구현 중 빠른 확인은 `bash scripts/gate.sh --skip-test`(tsc+lint만, ~1분)로.
        전체 게이트(test 포함, 5~10분)는 이 단계에서 돌리지 않는다 — 5번에서 1회만.
   → TASK_RESULT 작성 (정형 템플릿, 검증 커맨드 출력 증거 포함)

3. [Codex] 검증 리뷰 → REVIEW 작성
     ※ 리뷰는 **로직·아키텍처·코딩 컨벤션 검증에 집중**한다. git diff 기반으로 FSD 레이어·
       3단계 API 패턴·네이밍·에러 핸들링 규칙 위반, 버그 가능성을 판정.
     ※ **매 라운드 전체 게이트(tsc·lint·test)를 재실행하지 않는다.** 게이트는 5번(최종
       커밋 직전) 1회만 돈다 — 리뷰 라운드가 여러 번 돌아도 게이트는 마지막에 한 번뿐이다.
   ★ 근거 우선순위: ① git diff(실제 코드) ② TASK_PLAN의 AC ③ TASK_RESULT
     보고서의 주장은 diff에 재현 가능한 증거가 없으면 '미검증'으로 판정
   ★ 지적사항에 심각도 필수: Blocker / Major / Minor

4. 판정 분기:
   - Blocker/Major 있음 → [Claude] 해당 항목만 수정 → TASK_RESULT 갱신 → 3으로
                          (이 왕복 동안에도 전체 게이트 재실행 없음)
   - Minor만 있음      → PASS 처리. Minor는 REVIEW '이월' 섹션에 기록,
                          다음 단위 작업 또는 별도 정리 작업에서 일괄 반영
   - 지적 없음          → PASS

5. 리뷰 PASS 확정 → **최종 통합 게이트 1회**: `bash scripts/gate.sh`(전체, test 포함) 실행
   → PASS 확인 (이 출력이 TASK_RESULT·REVIEW의 최종 검증 증거) → 커밋
   → TASK_RESULT·REVIEW 아카이브 이동 → 다음 단위 작업
   ※ 이 단계에서 신규 실패가 나오면 3으로 돌아가 수정 후, 수정분만 반영해 5를 다시 1회 실행한다
     (게이트 자체를 반복하는 게 아니라 "PASS할 때까지 최종 단계에서만" 도는 구조).

★ 라운드 상한: 리뷰 3라운드 초과 시 에이전트 루프 중단, 사람이 직접 판단.
  (같은 항목이 2회 왕복하면 취향 충돌 가능성 — 즉시 사람 개입)
```

## 리뷰 라운드가 줄어드는 핵심 장치 3가지

1. **AC 체크리스트**: 리뷰가 "기준 대비 판정"이 되어 취향 코멘트가 줄어든다.
2. **기계적 게이트 선행**: LLM 리뷰(가장 비싼 검증)가 타입 오류·테스트 실패에
   낭비되지 않는다.
3. **심각도 분류 + Minor 이월**: 사소한 지적 하나로 풀 라운드가 돌지 않는다.
