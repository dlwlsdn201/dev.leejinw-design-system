# 기술 스택과 검증

제품 범위는 [`PRD.md`](../PRD.md), 패키지 사용법은 [`packages/ui/README.md`](../packages/ui/README.md)를 따른다.

| 영역 | 선택 |
| --- | --- |
| UI 패키지 | React 19, TypeScript 6, Vite 8 |
| 스타일과 토큰 | CSS Modules, CSS custom properties, DTCG JSON |
| 문서·예제 | Vite, Storybook 10 |
| 소비 검증 | Next.js 16 App Router |
| 테스트 | Vitest 5, React Testing Library |
| 패키지 관리 | Node.js 22 이상, pnpm 10.34.5 workspace |

이 저장소에는 백엔드·인증·데이터베이스가 없다. `@leejinw/ui`만 향후 npm 게시 대상이며 현재 `private: true`다.

## 검증 명령

| 명령 | 확인 항목 |
| --- | --- |
| `pnpm install --frozen-lockfile` | 의존성 재현 |
| `pnpm typecheck` | 세 workspace 타입 검사 |
| `pnpm lint` | ESLint |
| `pnpm test` | 토큰 유효성·대비와 컴포넌트 동작 |
| `pnpm build` | UI, Vite 문서, Next.js 소비 앱 빌드 |
| `pnpm storybook:build` | Storybook 정적 빌드 |
