# {{PROJECT_NAME}} 기술 스택 및 환경

작성일: TODO
상태: 초안

## 0. 문서 목적

이 문서는 구현에 사용할 기술 스택, 배포 환경, 백엔드/BaaS 사용 범위, 인증·데이터 접근 원칙, **검증 커맨드**를 정의한다. 제품 요구사항은 `PRD.md`를 기준으로 하고, 이 문서는 구현 환경과 기술 결정의 기준으로 사용한다.

AI 에이전트는 코드 생성 전 이 문서와 `.rules/coding-standards.mdc`의 스택 표를 확인한다. 두 문서가 어긋나면 `package.json`을 최종 기준으로 삼고 문서를 갱신한다.

구현 에이전트는 작업 결과를 보고하기 전에 §7 검증 커맨드를 실행해 통과시킨다. 실행 결과는 `docs/harness/TASK_RESULT.md`의 검증 증거 항목에 기록한다.

## 1. 우선 기술 방향

- TODO: 프레임워크 선택과 근거를 작성한다. (예: Next.js App Router / React SPA + Vite)
- TODO: 백엔드 전략을 작성한다. (예: BaaS 우선, 별도 API 서버, BFF)
- TODO: 배포 대상을 작성한다. (예: Vercel, Netlify, 자체 인프라)

## 2. 프론트엔드 스택

| 영역 | 선택 | 버전 | 비고 |
| --- | --- | --- | --- |
| 프레임워크 | TODO (예: Next.js App Router) | TODO | |
| 언어 | TypeScript | TODO | strict 모드 |
| 스타일 | TODO (예: Tailwind CSS + CVA) | TODO | |
| 서버 상태 | TODO (예: TanStack Query) | TODO | |
| 클라이언트 상태 | TODO (예: Jotai) | TODO | |
| 폼·검증 | TODO (예: react-hook-form + Zod) | TODO | |
| 테스트 | TODO (예: Vitest + RTL + MSW / Playwright) | TODO | |
| 패키지 매니저 | TODO (예: pnpm) | TODO | Node 버전 명시 |

## 3. 백엔드 / BaaS 사용 범위

- TODO: 사용하는 서비스와 포함 기능을 작성한다. (예: Supabase — Postgres, RLS, Auth, Storage, Realtime)
- TODO: MVP에서 의도적으로 제외하거나 단순화한 항목을 작성한다. (예: 실시간 수신은 polling으로 대체)
- TODO: 서버 신뢰 영역(Route Handler, Edge Function, BFF)이 필요한 기능을 명시한다.

## 4. 인증·데이터 접근 원칙

- TODO: 인증 방식과 세션 발급 흐름을 작성한다.
- TODO: 사용자 테이블과 인증 계정의 매핑 전략을 작성한다.

공통 금지 사항:

- 비밀번호·PIN 등 크리덴셜 원문 저장
- 클라이언트에서 크리덴셜 hash 조회 후 직접 비교
- 접근 제어(RLS, 권한 검사) 없이 데이터를 public API에 노출
- secret key(`service_role` 등)를 브라우저에 노출

## 5. 배포 환경

- TODO: 배포 플랫폼, 환경 구분(dev/staging/prod), 도메인 전략을 작성한다.
- TODO: 환경 변수 관리 방식을 작성한다. 브라우저 노출 변수(`NEXT_PUBLIC_*` 등)와 서버 전용 변수를 구분해 나열한다.

## 6. 기술 결정 기록

큰 기술 결정(프레임워크 교체, 상태 관리 변경 등)은 결정 일자·근거·대안과 함께 아래에 누적한다.

제품·설계 결정은 `PRD.md` §14 설계 결정 기록에 둔다. **스택과 인프라 선택은 이 문서, 제품 동작과 아키텍처 방향은 `PRD.md`**로 구분한다.

| 일자 | 결정 | 근거 | 검토한 대안 |
| --- | --- | --- | --- |
| TODO | TODO | TODO | TODO |

## 7. 검증 커맨드

구현 에이전트가 작업 완료를 보고하기 전에 실행해야 하는 커맨드다. 프로젝트 패키지 매니저와 스크립트에 맞게 채운다.

| 단계 | 커맨드 | 통과 기준 |
| --- | --- | --- |
| 타입 검사 | TODO (예: `pnpm tsc --noEmit`) | 에러 0건 |
| 린트 | TODO (예: `pnpm lint`) | 에러 0건 |
| 테스트 | TODO (예: `pnpm test`) | 전체 통과 |
| 빌드 | TODO (예: `pnpm build`) | 성공 (필요한 작업에만) |

실행 범위 기준은 `.rules/testing.mdc`를 따른다. 단순 UI·스타일 수정처럼 테스트가 불필요한 경우에도 타입 검사와 린트는 실행한다.

버그 수정 작업은 코드를 고치기 전에 **버그를 재현하는 실패 테스트를 먼저 작성해 Red를 확인**한 뒤 수정한다.

## 8. 로컬 실행 환경

- TODO: Node 버전과 패키지 매니저 버전을 명시한다.
- TODO: 개발 서버 실행 커맨드와 기본 포트를 작성한다.
- TODO: 실행 전 필요한 환경 변수 파일(`.env.local` 등)과 발급 방법을 작성한다.
