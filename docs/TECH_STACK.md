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

이 저장소에는 백엔드·인증·데이터베이스가 없다. `@dev.leejinw/ui`만 향후 npm 게시 대상이며 현재 `private: true`다.

## 검증 명령

| 명령 | 확인 항목 |
| --- | --- |
| `pnpm install --frozen-lockfile` | 의존성 재현 |
| `pnpm typecheck` | 세 workspace 타입 검사 |
| `pnpm lint` | ESLint |
| `pnpm test` | 토큰 유효성·대비와 컴포넌트 동작 |
| `pnpm build` | UI, Vite 문서, Next.js 소비 앱 빌드 |
| `pnpm storybook:build` | Storybook 정적 빌드 |

## 1차 확장 기반 (2026-10-26)

- `radix-ui@1.8.1`: Select, Switch, Dialog/AlertDialog, DropdownMenu, Popover, Tooltip, Tabs, Toast의 키보드·포커스·ARIA 기반. UI 패키지 dependency이며 라이브러리 번들에서 external로 유지.
- RadioGroup: 네이티브 fieldset/legend/radio로 브라우저의 선택·키보드·폼 동작 사용.
- 스타일: 기존 CSS Modules + CSS custom properties 유지. UI 패키지에 번역·라우터·전역 상태 라이브러리 추가 없음.
- 공개 API와 상태별 표본: [COMPONENT_EXPANSION.md](COMPONENT_EXPANSION.md).
