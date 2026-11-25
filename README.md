# Quiet Precision

개인 포트폴리오와 사이드 프로젝트를 위한 React 디자인 시스템의 첫 버전입니다. 딥 그린 한 계열과 차가운 중성색, Pretendard Variable, 라이트 모드를 사용합니다. 한국어·영어 전환은 소비 앱이 담당하며 컴포넌트에는 번역 문구를 넣지 않습니다.

GitHub 저장소: [dlwlsdn201/dev.leejinw-design-system](https://github.com/dlwlsdn201/dev.leejinw-design-system). npm 패키지 이름은 `@dev.leejinw/ui`입니다.

## 구성

- `packages/ui`: DTCG 토큰 원본, CSS custom properties, React 컴포넌트 19개
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

## 소비 프로젝트에서 사용

공개 패키지 [`@dev.leejinw/ui`](https://www.npmjs.com/package/@dev.leejinw/ui)는 React 19와 React DOM 19를 사용하는 앱에서 설치합니다. 패키지 버전은 소비 프로젝트의 lockfile로 고정하고, 업데이트할 때 컴포넌트 상태와 화면을 확인하세요.

```sh
pnpm add @dev.leejinw/ui
```

스타일은 JavaScript와 별도 배포됩니다. 앱의 진입점에서 `styles.css`를 **한 번** 불러와야 토큰과 컴포넌트 스타일이 적용됩니다. Pretendard Variable을 사용할 때만 `fonts.css`를 추가하세요. 폰트를 불러오지 않으면 소비 앱에서 원하는 글꼴을 지정할 수 있습니다.

```tsx
// Vite: src/main.tsx, Next.js App Router: src/app/layout.tsx
import '@dev.leejinw/ui/styles.css';
import '@dev.leejinw/ui/fonts.css'; // Pretendard를 사용할 때만
```

```tsx
import { Button, TextField } from '@dev.leejinw/ui';

export const ProjectForm = () => (
  <form>
    <TextField label="프로젝트 이름" name="projectName" required />
    <Button type="submit">저장</Button>
  </form>
);
```

Next.js에서는 위 스타일 import를 루트 레이아웃에 두고, 이벤트 핸들러나 상태를 사용하는 화면은 소비 앱의 Client Component에서 조합합니다. UI 패키지는 라우터·폼 라이브러리·번역 문자열을 제공하지 않으므로 해당 로직과 문구는 소비 앱에서 관리합니다. 패키지 내부 파일을 직접 import하지 말고 공개 경로인 `@dev.leejinw/ui`, `@dev.leejinw/ui/styles.css`, `@dev.leejinw/ui/fonts.css`, `@dev.leejinw/ui/tokens.json`을 사용하세요.

컴포넌트별 API와 조합 예시는 [패키지 가이드](packages/ui/README.md)와 [확장 컴포넌트 가이드](docs/COMPONENT_EXPANSION.md)를 참고하세요.

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

`packages/ui`의 `@dev.leejinw/ui@0.1.0`을 npm에 공개 게시했습니다. 인증 없는 별도 프로젝트에서 설치하고 CSS·폰트·타입 선언·라이선스 포함을 확인했습니다. `apps/docs`와 `apps/next-smoke`는 문서·소비 검증용입니다. 다크 모드, 날짜 입력, 테이블은 후속 범위입니다.

## 초기 검증 기록

- 통과: 토큰 대비 조합 10개, 타입 검사, ESLint, 컴포넌트 테스트 5개, Vite·Next.js·Storybook 빌드, 카탈로그 한·영 전환, Figma 토큰 이름 72개 대조.
- 추가 수동 확인: 320px 화면, 200% 확대, 전체 키보드 이동 순서와 포커스 잘림. 첫 탭 포커스는 확인했지만 브라우저의 임시 화면 크기 설정이 적용되지 않아 좁은 화면과 확대 상태는 완료로 표시하지 않았습니다.

## 1차 확장 (2026-10-26)

Select·RadioGroup·Switch·Dialog·AlertDialog·DropdownMenu·Popover·Tooltip·Tabs·Alert·Toast·Skeleton·Spinner 13종을 추가했습니다.

- [API와 사용 예시](docs/COMPONENT_EXPANSION.md)
- [Figma 상태별 시안](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA?node-id=57-57)
- 검증: 타입·린트·13개 테스트, UI·카탈로그·Next.js·Storybook 빌드, Chrome KO/EN 320/1440px 주요 동작, 별도 tarball 소비 타입·Vite 빌드 통과. 전체 접근성 인증이나 npm 출시 승인으로 간주하지 않습니다.
