# AGENTS.md

이 저장소는 개인 포트폴리오와 사이드 프로젝트에 재사용할 라이트 모드 React 디자인 시스템이다. 제품 범위와 결정은 `PRD.md`, 실제 기술 스택과 검증 명령은 `docs/TECH_STACK.md`를 따른다.

## 우선순위

사용자의 명시 요청 > 이 파일 > `PRD.md` > 실제 코드와 `package.json` > `.rules`의 적용 가능한 항목 > 일반 관례.

## 구조와 단일 원본

- `packages/ui`는 npm 패키지 `@leejinw/ui`의 유일한 소스다. 컴포넌트, CSS Modules, 토큰, 폰트를 소유한다.
- 토큰 값의 단일 원본은 `packages/ui/tokens/tokens.json`이다. `pnpm tokens`로 CSS를 생성하고 생성 파일을 직접 수정하지 않는다.
- `apps/docs`는 카탈로그와 Storybook, `apps/next-smoke`는 Next.js 소비 검증용이다.
- 번역 문자열과 언어 전환은 소비 앱이 소유한다. UI 패키지에 앱 전용 라우터·폼·상태 관리 의존성을 추가하지 않는다.
- Figma는 시각 설계와 상태 검토용이다. 토큰 변경 시 코드와 Figma를 함께 점검한다.

## 작업 규칙

- 요청 범위만 수정하고 기존 공개 API와 접근성을 유지한다.
- 색·간격·모서리·타이포그래피는 의미 기반 토큰을 사용한다. 컴포넌트는 HTML 기본 속성을 우선 계승한다.
- TypeScript에서 `any`를 피하고, 컴포넌트는 화살표 함수로 작성한다. 테스트는 사용자 행동과 접근성 계약을 검증한다.
- 변경 후 `pnpm typecheck`, `pnpm lint`, `pnpm test`를 실행한다. 패키지 계약이나 빌드에 영향이 있으면 `pnpm build`와 `pnpm storybook:build`도 실행한다.
- `.rules`와 `.agents`에는 저장소 생성 시 제공된 범용 앱 템플릿이 남아 있다. FSD·API·서버 상태 규칙은 해당 기능이 있는 소비 앱에만 적용하고, UI 패키지에는 적용하지 않는다. `docs/template-harness-docs-v2`도 참고 템플릿이다.
- 커밋과 원격 Push는 사용자의 명시 요청이 있을 때만 진행한다. npm 게시도 별도 요청을 받는다.
