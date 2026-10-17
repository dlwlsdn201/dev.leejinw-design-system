---
version: v2.0
updated: 2026-07-05
name: generate-feature
description: entities hook 호출과 에러/로딩 위임(ApiQueryBoundary)이 적용된 FSD feature 컴포넌트를 생성. features 도메인 컴포넌트 신규 작성 시 적용. globs: src/features/**/*
---

# Feature 컴포넌트 생성 스킬

시작 전에 `architecture.mdc`와 `ui-standards.mdc`를 읽는다.

## 입력

- 도메인/피처명 (예: `user-profile-edit`), 컴포넌트명 (PascalCase), 연동할 entities hook

## 준수사항

1. **경로**: `features/{피처명}/ui/{kebab-컴포넌트명}.tsx` + 피처 루트에 배럴 `index.ts` 생성.
2. **UI 기준**: 프로젝트 디자인 시스템 문서의 토큰·레이아웃·패턴 적용. `@shared/ui` 컴포넌트 우선 재사용.
3. **선언적 데이터**: entities의 `use{X}Query`만 호출한다. 컴포넌트 내부에 `if (isLoading)`·try-catch 금지 — 상위에서 `<ApiQueryBoundary>`로 감싸고 데이터는 존재한다고 가정한다.
4. **변경 액션**: entities `use{Action}{X}Mutation`을 호출하고, `mutateAsync` 성공/실패 분기에서 toast·modal 닫기·라우팅을 처리한다.
5. **클라이언트 경계** (Next.js App Router): 훅·이벤트가 필요한 파일에만 `'use client'` 선언.
6. 화살표 함수 + PascalCase 컴포넌트, 파일명은 kebab-case.
