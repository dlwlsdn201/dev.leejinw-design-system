# template--agentic-dev-project

AI 도구 유형과 관계없이 공통으로 사용할 수 있는 Agentic Development 보일러플레이트입니다.

이 템플릿은 Cursor, Claude, Codex 등 특정 도구의 전용 설정 폴더에 규칙을 직접 종속시키지 않고, 프로젝트 루트의 공통 문서 구조를 기준으로 AI 작업 지침, 개발 규칙, 작업별 스킬, 제품 요구사항 템플릿을 관리합니다.

GitHub Repository: [dlwlsdn201/template--agentic-dev-project](https://github.com/dlwlsdn201/template--agentic-dev-project)

## 목적

AI 코딩 에이전트를 프로젝트에 투입할 때 매번 반복되는 초기 설정을 줄이고, 프로젝트별 개발 원칙과 작업 흐름을 일관되게 적용하는 것이 목적입니다.

이 보일러플레이트는 다음 문제를 해결하기 위해 사용합니다.

- AI 도구별 규칙 폴더가 분산되어 같은 내용을 여러 번 관리해야 하는 문제
- 에이전트가 프로젝트 구조, 코딩 컨벤션, 테스트 기준을 매번 다시 파악해야 하는 문제
- PRD, 작업 규칙, 리뷰 기준, 스킬 문서가 서로 다른 위치에 흩어지는 문제
- 프로젝트 시작 시 AI 친화적인 작업 기준을 빠르게 세팅하기 어려운 문제

## 핵심 컨셉

루트 경로의 공통 폴더를 기준으로 문서를 관리합니다.

```text
project-root/
  AGENTS.md
  PRD.md
  .agents/
  .rules/
  .skills/
  docs/harness/
```

도구별 자동 인식이 필요한 경우 `.cursor/`, `.claude/`, `.codex/` 같은 폴더에는 공통 문서를 참조하는 얇은 연결 문서만 둡니다.

## 폴더 구조

```text
.
├── AGENTS.md
├── PRD.md
├── .agents
│   ├── README.mdc
│   └── *.md
├── .rules
│   ├── README.mdc
│   └── *.mdc
├── .skills
│   ├── README.mdc
│   └── */SKILL.md
└── docs
    ├── TECH_STACK.md
    ├── template-harness-docs-v2   # 하네스 문서 원본 템플릿 (복사용)
    │   ├── PROCESS.md
    │   ├── PRD.md
    │   ├── TASK_PLAN.md
    │   ├── TASK_RESULT.md
    │   └── REVIEW.md
    └── harness                    # 실제 운영 문서 (템플릿에서 복사해 사용)
        ├── PROCESS.md
        ├── TASK_PLAN.md
        ├── TASK_RESULT.md
        ├── REVIEW.md
        └── archive/{issue-code}/
```

`docs/template-harness-docs-v2`는 **수정하지 않는 원본 템플릿**이고, 실제 작업은 이를 `docs/harness`로 복사해서 진행합니다. 템플릿의 `PRD.md`는 루트 `PRD.md`가 그 역할을 하므로 별도로 복사하지 않습니다.

## 주요 문서

### `AGENTS.md`

프로젝트 루트에서 AI 에이전트가 가장 먼저 참고하는 진입점 문서입니다.

역할:

- 프로젝트 개요 제공
- 문서 우선순위 정의
- `.agents`, `.rules`, `.skills`, `PRD.md`, `docs/harness` 위치 안내
- 하네스 운영 규칙(문서 소유권, 검증 게이트, 리뷰 심각도, 라운드 상한) 안내
- 도구별 설정 폴더보다 공통 문서를 우선하도록 안내

### `.agents`

AI 에이전트의 작업 방식, 응답 방식, 검증 흐름 등 실행 지침을 관리합니다.

예시:

- 코드 리뷰 에이전트 지침
- 디버깅/리팩터링 에이전트 지침
- FSD 설계 에이전트 지침
- Vitest 테스트 작성 에이전트 지침

### `.rules`

아키텍처, 네이밍, API, 테스트, 리뷰 등 프로젝트 개발 규칙을 관리합니다.

예시:

- FSD 아키텍처 규칙
- API 계약 및 에러 처리 규칙
- 네이밍 규칙
- 테스트 정책
- 공유 컴포넌트 사용 규칙

### `.skills`

반복 가능한 작업 절차나 특정 도메인 지식을 관리합니다.

예시:

- FSD API 레이어 생성
- 폼 생성
- 테스트 코드 생성
- 코드 리뷰
- Figma to Code

### `PRD.md`

제품 요구사항 문서입니다.

제품의 문제 정의, 목표, 사용자, MVP 범위, 주요 기능, 성공 기준 등을 정리합니다.

설계 결정 기록(ADR)과 단위 작업 로드맵도 이 문서에서 관리합니다. 단위 작업 문서(`TASK_RESULT`, `REVIEW`)는 커밋 후 아카이브되므로, 이후에도 알아야 할 결정만 `PRD.md`로 승격시킵니다.

### `docs/harness`

여러 AI 모델이 계획·구현·검증을 나눠 맡을 때 사용하는 **작업 상태 문서 세트**입니다. AI가 이전 대화 기억에 의존하지 않고 문서만 읽어도 현재 작업, 완료 기준, 검증 결과, 재개 지점을 이해하게 만드는 것이 목적입니다.

| 문서 | 역할 | 소유 |
| --- | --- | --- |
| `PROCESS.md` | 하네스 운영 규칙 (역할 분담, 프로세스, 게이트) | 공통 |
| `TASK_PLAN.md` | 현재 단위 작업 플랜 + 완료 기준(AC) | 계획·리뷰 에이전트 |
| `TASK_RESULT.md` | 작업 결과 보고 + 중단 시 체크포인트 | 구현 에이전트 |
| `REVIEW.md` | 심각도 기반 리뷰 판정 | 계획·리뷰 에이전트 |
| `archive/{issue-code}/` | 커밋 완료된 단위 작업의 결과·리뷰 보관 | 공통 |

운영 규칙 세 가지:

- **파일 확장자**: 하네스 상태 문서는 `.md`, 규칙 문서(`.rules`)는 `.mdc`로 구분합니다. 상태 문서가 rules로 오인되어 컨텍스트에 자동 주입되는 것을 막습니다.
- **현재 작업만 유지**: 모든 하네스 문서는 진행 중인 단위 작업 하나만 담습니다. 이력은 `archive/`와 git이 담당합니다.
- **아카이브**: 커밋 시점에 `TASK_RESULT.md`·`REVIEW.md`를 `archive/{issue-code}/`로 옮기고 본 문서는 비웁니다.

상세 프로세스는 `docs/harness/PROCESS.md`를 참고합니다.

## 템플릿 문서

루트의 `AGENTS.md`와 `PRD.md`가 곧 템플릿입니다. 별도 복제 없이 `{{PROJECT_NAME}}`, `{{PRODUCT_NAME}}` 등의 플레이스홀더를 프로젝트에 맞게 채워서 그대로 사용합니다.

하네스 문서만 예외적으로 원본/사본을 구분합니다. `docs/template-harness-docs-v2`는 원본으로 두고, 작업용 사본을 `docs/harness`로 복사해 사용합니다. 단위 작업마다 내용이 완전히 교체되는 문서라서, 빈 템플릿 원본이 남아 있어야 다음 작업을 새로 시작할 수 있기 때문입니다.

## 사용 방법

### 1. 템플릿으로 새 프로젝트 생성

GitHub에서 이 저장소를 템플릿 저장소로 설정한 뒤, `Use this template` 기능으로 새 프로젝트를 생성합니다.

### 2. 프로젝트 정보 수정

새 프로젝트에서 다음 문서를 프로젝트 상황에 맞게 수정합니다.

- `AGENTS.md`
- `PRD.md`

### 3. 규칙 선별

`.rules` 하위 규칙 중 프로젝트에 맞지 않는 항목은 제거하거나 수정합니다.

예를 들어 FSD를 사용하지 않는 프로젝트라면 FSD 관련 규칙을 프로젝트 구조에 맞게 조정합니다.

### 4. 스킬 선별

`.skills` 하위 문서 중 프로젝트에서 반복적으로 사용할 작업 절차만 유지합니다.

사용하지 않는 스킬은 제거해도 됩니다.

### 5. 하네스 문서 준비

`docs/template-harness-docs-v2`의 `PROCESS.md`, `TASK_PLAN.md`, `TASK_RESULT.md`, `REVIEW.md`를 `docs/harness`로 복사합니다.

```bash
mkdir -p docs/harness && cp docs/template-harness-docs-v2/{PROCESS.md,TASK_PLAN.md,TASK_RESULT.md,REVIEW.md} docs/harness/
```

템플릿의 `PRD.md`는 복사하지 않고, 그 안의 ADR·로드맵 섹션 구성을 루트 `PRD.md`에서 사용합니다.

### 6. 도구별 연결 문서 추가

특정 AI 도구의 자동 인식 기능을 사용하려면 필요한 도구 폴더를 추가합니다.

예시:

```text
.cursor/rules/
.claude/rules/
.codex/
```

단, 상세 규칙 본문은 루트 공통 폴더에 두고 도구별 폴더에는 참조 문서만 두는 것을 권장합니다.

## 문서 우선순위

기본 우선순위는 다음과 같습니다.

1. 사용자의 명시 요청
2. 루트 `AGENTS.md`
3. `docs/harness/TASK_PLAN.md` (현재 단위 작업의 범위와 완료 기준)
4. `.agents/**/*.{md,mdc}`
5. `.rules/**/*.mdc`
6. `.skills/**/*.{md,mdc}`
7. `PRD.md` 또는 프로젝트 PRD 문서
8. 기존 코드 컨벤션

`TASK_PLAN.md`가 규칙 문서보다 위에 있는 이유는 우선순위가 아니라 범위 때문입니다. 무엇을 어디까지 만들지는 `TASK_PLAN.md`가 정하고, 어떻게 만들지는 `.rules`가 정합니다. 둘이 충돌하면 사용자에게 확인합니다.

## 권장 운영 방식

- 프로젝트 시작 시 `PRD.md`를 먼저 작성합니다.
- 구현 전 `AGENTS.md`에서 프로젝트 목적과 문서 우선순위를 정리합니다.
- 개발 규칙은 `.rules`에 두고, 반복 작업 절차는 `.skills`에 둡니다.
- 에이전트 역할별 지침은 `.agents`에 둡니다.
- 특정 AI 도구 설정 폴더에는 공통 문서의 복사본을 여러 개 만들지 않습니다.
- 규칙을 수정할 때는 중복 문서를 함께 수정해야 하는 구조를 피합니다.
- 계획·구현·검증은 서로 다른 세션(가능하면 다른 모델)이 맡아 교차 검증 구조를 유지합니다.
- 구현 에이전트는 결과 보고 전에 타입 검사·린트·테스트를 통과시킵니다. 가장 비싼 검증 수단인 LLM 리뷰를 싼 문제에 낭비하지 않기 위해서입니다.
- 리뷰 지적사항에는 심각도(Blocker / Major / Minor)를 붙이고, Minor만 남으면 수정 라운드를 돌리지 않고 이월합니다.

## 추천 사용 흐름

1. 루트 `PRD.md`의 플레이스홀더를 채워 프로젝트 PRD를 작성합니다.
2. 루트 `AGENTS.md`의 프로젝트 개요를 채우고 문서 우선순위를 확인합니다.
3. `docs/TECH_STACK.md`의 스택과 검증 커맨드를 확정합니다.
4. 프로젝트 기술 스택과 아키텍처에 맞게 `.rules`를 조정합니다.
5. 반복 작업에 필요한 `.skills`만 남깁니다.
6. 하네스 템플릿을 `docs/harness`로 복사합니다.
7. AI 에이전트에게 작업을 요청할 때 `AGENTS.md`를 기준 문서로 사용하게 합니다.

## 단위 작업 사이클

```text
[계획] PRD 갱신 → TASK_PLAN 작성 (완료 기준 AC 포함)
   ↓
[구현] TASK_PLAN 기반 구현 → 타입·린트·테스트 통과 → TASK_RESULT 작성
   ↓
[검증] git diff와 AC 기준으로 리뷰 → REVIEW 작성 (심각도 부여)
   ↓
Blocker/Major 있음 → 해당 항목만 수정 후 재검증 (최대 3라운드)
Minor만 있음 / 지적 없음 → PASS
   ↓
[완료] 커밋 → TASK_RESULT·REVIEW를 archive/{issue-code}/로 이동 → 다음 작업
```

리뷰의 판단 근거는 `git diff`(실제 코드)가 1순위, `TASK_PLAN`의 완료 기준이 2순위, `TASK_RESULT` 보고가 3순위입니다. 결과 보고서는 자기 작업에 대한 자기 서술이라 낙관 편향이 있으므로, 보고 내용이 diff와 검증 증거로 뒷받침되지 않으면 미검증으로 판정합니다.

## 라이선스

개인 프로젝트 및 사내 프로젝트에 맞게 자유롭게 수정해서 사용할 수 있습니다.
