---
version: v2.0
updated: 2026-07-05
name: generate-form
description: react-hook-form + Zod resolver + @shared/ui 컴포넌트 기반 규격화된 폼을 생성. 폼 컴포넌트 신규 작성, 유효성 검사, 폼 제출 mutation 연동 시 적용. globs: src/**/*.tsx
---

# 표준 폼 생성 스킬

시작 전에 `ui-standards.mdc`를 읽는다. 입력으로 '폼의 목적'과 '필드 목록'을 받는다.

## 준수사항

1. **스키마 우선**: 유효성 검사는 Zod 스키마로 정의하고 `zodResolver`(`@hookform/resolvers/zod`)로 연결한다. 스키마는 `entities/{domain}/model/`에 두고 타입은 `z.infer`로 도출한다.
2. **컴포넌트 재사용**: 일반 `<input>`/`<select>` 대신 `@shared/ui`의 폼 컴포넌트를 우선 사용하고, 없으면 프로젝트가 채택한 headless primitive 기반으로 추가한다. 단순 입력은 `register`, 복잡한 상태(숫자 포맷·드롭다운·날짜)는 `control`(Controller) 방식으로 구분한다.
3. **제출 로직**: entities의 `use{Action}{X}Mutation`을 호출하는 `handleSubmit` 뼈대를 포함한다. `mutateAsync` 성공/실패 분기에서 사용자 피드백(toast 등)을 처리한다.
4. **에러 표시**: 필드 에러는 각 필드 하단에, 서버 에러(`NormalizedApiError.message`)는 폼 상단 또는 toast로 노출한다.
5. **접근성**: label-input 연결, 제출 중 버튼 disabled 처리.
