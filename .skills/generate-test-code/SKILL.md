---
version: v2.0
updated: 2026-07-05
name: generate-test-code
description: Vitest + RTL + MSW 기반 최소주의 테스트 작성. 테스트 코드 생성, 회귀 테스트, 테스트 리뷰 시 적용. globs: ["**/*.test.ts", "**/*.test.tsx"]
---

# 테스트 작성 스킬

시작 전에 `testing.mdc`를 읽는다.

## 1. 작성 전 확인

- **버그 수정 요청**: 코드 수정 **전에** 버그를 재현하는 실패(Red) 회귀 테스트를 먼저 작성·실행하고, 수정 후 통과(Green)를 확인한다.
- **신규 테스트 요청**: 대상이 테스트 대상 카테고리(shared 유틸, entities hook, 핵심 feature, 공통 UI)에 해당하는지 확인하고, 아니면 작성하지 않도록 권고한다.

## 2. 대상별 방법

| 대상 | 방법 |
|------|------|
| `shared/lib`, `shared/api` | 순수 함수 단위 테스트, MSW 불필요 |
| `entities/{domain}/hook` | MSW로 모킹, 정상 + 에러 응답(401/500) 검증 |
| `features/` | Happy Path 1 + 치명적 실패 1 |
| `shared/ui` | 행동 기반 검증 |

⚙️ 프로젝트 설정: 각 카테고리의 대표 테스트 파일을 레퍼런스로 지정한다.

## 3. 도구 원칙

- **MSW**: `src/test/msw/`의 핸들러 팩토리를 사용한다 (응답 계약 자동 준수). HTTP 모듈 직접 모킹 금지.
- **RTL 쿼리**: `getByRole` > `getByLabelText` > `getByText`. `getByTestId`는 최후 수단.
- **Co-location**: 대상 파일 옆 `*.test.ts(x)`. `__tests__` 폴더 금지.
- **금지**: 스타일 검증, 구현 세부사항(`useState` 값 등), 스냅샷, Fetcher 단독 테스트.
- 외부 UI primitive가 테스트 환경에서 불안정하면 접근성 역할(button/input role)이 유지되는 얇은 mock으로 대체 허용.

## 4. 실행 (⚙️ 프로젝트 스크립트에 맞게 수정)

`pnpm test` (1회) / `pnpm test:watch` (감시) / `pnpm e2e` (Playwright)
