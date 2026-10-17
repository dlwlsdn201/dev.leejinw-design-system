# Quiet Precision

개인 포트폴리오와 사이드 프로젝트를 위한 React 디자인 시스템의 첫 버전입니다. 딥 그린 한 계열과 차가운 중성색, Pretendard Variable, 라이트 모드를 사용합니다. 한국어·영어 전환은 소비 앱이 담당하며 컴포넌트에는 번역 문구를 넣지 않습니다.

GitHub 저장소: [dlwlsdn201/leejinw-design-system](https://github.com/dlwlsdn201/leejinw-design-system). npm 패키지 이름은 `@leejinw/ui`입니다.

## 구성

- `packages/ui`: DTCG 토큰 원본, CSS custom properties, React 컴포넌트 6개
- `apps/docs`: 한·영 전환이 가능한 카탈로그와 Storybook 상태 문서
- `apps/next-smoke`: Next.js App Router 소비 환경 확인용 작은 앱
- `PRD.md`: 기획과 완료 기준

Figma 작업 파일: [Quiet Precision 디자인 라이브러리](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=0-1). `00 Foundations`, `01 Components`, `02 Patterns & QA` 세 페이지에 라이트 모드 토큰과 시안을 관리합니다.

## 시작

Node.js 22 이상과 pnpm 10을 사용합니다.

```sh
pnpm install
pnpm dev
```

카탈로그는 `http://127.0.0.1:5173`, Storybook은 `pnpm storybook` 실행 후 `http://127.0.0.1:6006`에서 확인합니다.

```sh
pnpm typecheck
pnpm test
pnpm build
pnpm storybook:build
```

## 토큰 변경 흐름

1. `packages/ui/tokens/tokens.json`에서 값을 수정합니다. 이 파일이 토큰의 단일 원본입니다.
2. `pnpm tokens`로 `src/tokens.css`를 재생성합니다. 생성된 CSS는 직접 수정하지 않습니다.
3. 빌드·대비·컴포넌트 상태를 검증합니다.
4. 동일한 값을 Figma 변수로 반영하고 시각적으로 검토합니다.

Figma의 변수 이름은 JSON 경로를 `/`로 연결합니다. 예: `color.action.default` → `color/action/default`. 현재 코드와 Figma에 토큰 72개가 반영되어 있습니다. Figma 불투명도 변수는 편집기 단위에 맞춰 `55`, `75`로 표시되며 CSS 원본은 `0.55`, `0.75`입니다. 시간 변수도 Figma에는 밀리초(`150`, `200`, `700`), CSS에는 초(`0.15s`, `0.2s`, `0.7s`)로 표현합니다.

Figma 연결 환경에는 Pretendard Variable이 없어 텍스트 스타일은 `Preview / ...` 이름으로 Noto Sans KR을 사용합니다. 웹 구현의 글꼴 기준은 Pretendard Variable입니다. Figma에서 정확한 글꼴 비교가 필요할 때는 해당 글꼴을 사용할 수 있는 환경에서 다시 확인해야 합니다.

컴포넌트 바로가기: [Button](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=7-43), [Link](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=7-107), [TextField](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=7-60), [Textarea](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=7-77), [Checkbox](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=7-93), [Badge](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=7-101).

토큰은 원시 색상과 의미 기반 색상을 분리합니다. 컴포넌트에는 의미 기반 변수만 사용합니다. Figma에서 시각 구성과 상태를 검토하고, 코드·문서는 동작과 사용 계약의 기준으로 유지합니다.

## 배포 상태

현재 패키지는 `private`이며 외부에 게시되지 않았습니다. 이 저장소에서는 `packages/ui`만 향후 npm 설치 대상이고, `apps/docs`와 `apps/next-smoke`는 문서·소비 검증용으로 유지합니다. 공개 전에는 npm의 `@leejinw` 범위에 대한 게시 권한을 확인하고, 패키지 압축물의 CSS·폰트·타입 선언을 별도 프로젝트에서 설치해 검증합니다. 다크 모드와 복합 컴포넌트는 후속 범위입니다.

## 검증 기록

- 통과: 토큰 대비 조합 10개, 타입 검사, ESLint, 컴포넌트 테스트 5개, Vite·Next.js·Storybook 빌드, 카탈로그 한·영 전환, Figma 토큰 이름 72개 대조.
- 추가 수동 확인: 320px 화면, 200% 확대, 전체 키보드 이동 순서와 포커스 잘림. 첫 탭 포커스는 확인했지만 브라우저의 임시 화면 크기 설정이 적용되지 않아 좁은 화면과 확대 상태는 완료로 표시하지 않았습니다.
