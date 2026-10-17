---
version: v3.0
updated: 2026-07-05
name: generate-fsd-api-layer
description: FSD 3단계 API 세트(순수 Fetcher, Query/Mutation Hook, MSW 핸들러)를 프로젝트 컨벤션에 맞게 생성. entities API 추가, 신규 API 연동, mock 선행 개발 시 적용. globs: src/entities/**/*
---

# FSD API 세트 생성 스킬

시작 전에 `architecture.mdc` §2와 `api-standards.mdc`를 읽는다.

## 1. 입력 확인

1. 도메인명 — `entities/` 하위 기존 슬라이스 또는 신규 (예: `user`, `order`)
2. API 기능 — CRUD 동작과 리소스 (예: `readUserDetail`, `createOrder`)
3. API path — base URL 제외 상대 경로 (예: `users/{userId}`)
4. 백엔드 미구현 여부 — 미구현이면 MSW mock 핸들러까지 생성

## 2. 생성 파일 (파일명은 모두 kebab-case)

| 대상 | 경로 | 규칙 |
|------|------|------|
| 순수 Fetcher | `entities/{domain}/api/{kebab-기능명}.ts` | 공통 HTTP 클라이언트 호출만. Hook·try-catch 금지 |
| 도메인 타입 | `entities/{domain}/model/` | 서버 계약 필드명 유지, Zod 스키마 필요 시 함께 |
| 조회 Hook | `entities/{domain}/hook/use-{x}-query.ts` | `useSuspenseQuery`, queryKey를 `create{X}QueryKey` 또는 상수로 export |
| 변경 Hook | `entities/{domain}/hook/use-{action}-{x}-mutation.ts` | `useMutation`, `onSuccess`에 `invalidateQueries`만 |
| Public API | `entities/{domain}/index.ts` | 신규 export 추가 |
| MSW mock (필요 시) | `src/test/msw/` | 핸들러 팩토리 사용, 응답은 `{ data }` 래퍼 준수 |

## 3. 강제 규칙

- Fetcher: `read/create/update/delete` 접두사 camelCase. 반환 타입은 `ApiSuccessResponse<T>` 계약을 따른다.
- Hook: 조회 `use{X}Query` / 변경 `use{Action}{X}Mutation`. entities hook에 toast·modal·router 금지 — UI 피드백은 features에서 `mutateAsync` 분기로 처리.
- queryKey는 조회 hook에서 export해 mutation invalidate와 SSOT를 맞춘다.
- 모든 export에 TypeScript 타입(Params/Response)과 JSDoc(`@returns`) 포함.

## 4. 레퍼런스 (⚙️ 프로젝트 설정: 실제 파일로 교체)

- `entities/{domain}/api/read-*.ts` — Fetcher 패턴
- `entities/{domain}/hook/use-*-query.ts` — 조회 Hook + queryKey 팩토리
- `entities/{domain}/hook/use-create-*-mutation.ts` — Mutation Hook + invalidate
