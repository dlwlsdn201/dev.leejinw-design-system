# Claude Code 교차 검증 요청서 — Quiet Precision

- 작성일: 2026-10-18
- 기준 코드: `2381598e1076076b75d18a6cffd0406b07453300`
- 저장소: <https://github.com/dlwlsdn201/dev.leejinw-design-system>
- 검토 대상 패키지: `@dev.leejinw/ui` / 현재 버전 `0.1.0`

## 1. Claude Code에게 요청하는 작업

이 문서를 진입점으로 삼아 **개인용 React 디자인 시스템의 구조·설계·정책과 실제 구현을 독립적으로 교차 검증**한다. 목적은 라이트 모드 v1을 안정화하고, npm에 게시하기 전에 수정해야 할 문제와 후속 개선을 구분하는 것이다.

사용자는 5년차 React 개발자다. 불필요한 추상화보다 가독성·유지보수성·확장성, 단일 원본(SSOT), HTML 기본 동작과 접근성을 중시한다. 기존 구현을 옹호하거나 대규모 라이브러리 수준의 기능을 무조건 요구하지 말고, 개인 포트폴리오·사이드 프로젝트에서 실제로 재사용하기에 적절한지 판단한다.

검토 방식과 권한:

- 이 문서는 **검토 요청서이며 PASS 보고서가 아니다**. 아래의 구현 설명과 이전 검증 기록도 실제 코드로 재확인한다.
- 검토를 시작할 때 현재 브랜치·커밋·작업 트리 상태를 기록한다. 기준 코드 이후 변경과 사용자의 미커밋 변경을 구분한다.
- 코드·토큰·정책·Figma는 읽기 전용으로 검토한다. 수정 제안은 보고서에 남긴다. 검증 명령이 생성하는 로컬 빌드 산출물은 허용하되 소스 변경이 발생하면 보고한다.
- 결과는 `docs/shared/claude-code-cross-review-result.md`에 작성한다. 기존 결과가 있다면 덮어쓰지 말고 날짜·차수를 붙인 별도 파일에 작성한다.
- 커밋·Push·npm 게시·Figma 수정은 이 검토 요청에 포함되지 않는다. 계정 설정이나 인증 토큰을 조회할 필요도 없다.
- 도구·브라우저·Figma 접근이 없으면 그 부분을 **미검증**으로 표시하고 가능한 코드·문서 검토를 끝까지 수행한다.
- 단순 취향이나 미래 가능성보다 현재 계약 위반, 재현 가능한 문제, 소비 앱에 미치는 영향을 우선한다. 최신 외부 사양과 비교할 때는 공식 문서 링크와 확인일을 남긴다.

## 2. 사용자와 합의한 방향

| 항목 | 결정 |
| --- | --- |
| 사용처 | 개인 포트폴리오와 사이드 프로젝트. 첫 실제 적용 제품은 아직 정하지 않음 |
| 시각 방향 | 절제됨·정교함·명료함. 딥 그린 강조색, 중성색, 정렬과 그리드 중심 |
| 테마 순서 | 라이트 모드 v1을 먼저 안정화하고 이후 다크 모드 진행 |
| 언어 | 한국어·영어를 전환하는 i18n. 소비 앱이 번역과 언어 선택을 소유 |
| 글꼴 | 웹 기준 Pretendard Variable. 영문 전용 디스플레이 글꼴은 v1에서 제외 |
| 배포 방향 | 다른 프로젝트에서 설치할 npm UI 패키지. 이름은 `@dev.leejinw/ui`로 확정 |
| 초기 범위 | Button, Link, TextField, Textarea, Checkbox, Badge의 기본 계약 |
| 통합 예제 | 컴포넌트 카탈로그와 작은 조합 예제. 포트폴리오 아카이브 제품 구현은 필수 아님 |
| 확장 원칙 | 실제 사용 사례가 생기면 추가. Dialog·Select·Tabs·Toast·Table·다크 모드는 후속 |

현재 사용자가 Figma 디자인 초안을 검토 중이다. 시각 방향의 최종 승인이나 수동 QA 완료로 간주하지 않는다. 기능 추가나 색상 변경을 전제로 한 검토도 피한다.

## 3. 문서와 구현의 기준

| 자료 | 담당하는 기준 | 검토 시 주의 |
| --- | --- | --- |
| [`../../AGENTS.md`](../../AGENTS.md) | 현재 저장소 작업 규칙과 적용 범위 | 가장 먼저 읽을 것 |
| [`../../PRD.md`](../../PRD.md) | 사용자 목표, v1 범위, 설계 정책과 완료 기준 | 초안 수치와 최종 구현 값의 차이를 대조할 것 |
| [`../../docs/TECH_STACK.md`](../TECH_STACK.md) | 현재 스택과 검증 명령 | 정확한 버전·스크립트는 각 `package.json`으로 확인 |
| [`../../packages/ui/tokens/tokens.json`](../../packages/ui/tokens/tokens.json) | **토큰 값의 단일 원본** | 이 문서의 요약 표를 새 원본으로 삼지 말 것 |
| [`../../packages/ui/src/index.ts`](../../packages/ui/src/index.ts), 컴포넌트 소스 | 현재 공개 API와 동작 | 실제 동작이 의도한 정책에 부합하는지 검증 |
| [`../../packages/ui/README.md`](../../packages/ui/README.md), Storybook | 소비 방법, 상태와 예제 | 설명·예제가 실제 API를 충분히 전달하는지 검증 |
| Figma | 시각 구성·변형·상태 검토 | 접근하지 못했다면 일치 여부를 추정하지 말 것 |

루트 `.rules`, `.agents`, `.skills`와 `docs/template-harness-docs-v2`에는 범용 앱 템플릿이 남아 있다. `AGENTS.md`에 따라 FSD·API·서버 상태 규칙을 UI 라이브러리에 일괄 적용하지 않는다. **의도한 정책과 실제 구현이 다르면 한쪽을 임의로 정답 처리하지 말고 차이·영향·권고를 기록**한다.

현재 README의 배포 상태 문단에는 과거 scope인 `@leejinw`가 남아 있다. 현재 계약은 `@dev.leejinw/ui`다. 이 문서 불일치를 알고 있는 상태이며, 그 밖의 오래된 이름·링크·완료 주장이 남았는지도 검토한다.

## 4. 저장소 구조와 책임

```text
packages/ui/
  tokens/tokens.json            # DTCG 형식으로 작성한 토큰 원본
  scripts/build-tokens.mjs      # JSON → CSS custom properties
  scripts/validate-tokens.mjs   # 지정한 색상 조합의 대비 검사
  scripts/copy-assets.mjs      # 폰트 CSS·폰트·OFL 라이선스 복사
  src/index.ts                 # 공개 컴포넌트·Props 진입점
  src/styles.css               # 생성 토큰 CSS 진입점
  src/tokens.css               # 생성 파일. 직접 편집하지 않음
  src/components/              # 6개 공개 컴포넌트, 내부 필드 유틸, CSS Modules
  src/assets/                  # Pretendard Variable, fonts.css, OFL.txt
  vite.config.ts               # ESM 번들, React external, use client 배너
apps/docs/
  src/App.tsx                  # KO/EN 전환 카탈로그
  src/stories/                 # 컴포넌트 상태 예제
  .storybook/                  # Storybook 설정과 공통 CSS 로딩
apps/next-smoke/
  src/app/                     # Next.js App Router의 패키지 소비 예제
docs/shared/                   # 모델 간 검토 요청과 결과 공유
```

소비 앱 → 공개 UI API → 내부 컴포넌트·스타일 → 의미 기반 색상/간격 스케일 → 토큰 원본의 흐름을 유지하려는 구조다. UI 패키지는 번역, 라우터, 서버 상태, 비즈니스 규칙을 소유하지 않는다. `FieldMessage`와 `useFieldIds`는 내부 구현이며 공개 export에 포함되지 않는다.

스택은 React 19, TypeScript 6, Vite 8, Storybook 10, Next.js 16, Vitest 5·React Testing Library, pnpm workspace다. UI의 기본 스타일은 CSS Modules와 CSS custom properties다. 카탈로그의 전역 CSS와 소비 검증 앱의 인라인 예제 스타일은 UI 패키지와 구분해서 평가한다.

## 5. Foundations 정책과 현재 값

색은 원시 값과 역할을 나누고 컴포넌트에서 의미 기반 색상을 사용한다. 간격·모서리 수치는 범용 웹 UI의 시작값이며 업계 공통의 의무값으로 간주하지 않는다. 표는 현재 JSON의 요약이다.

| 역할/항목 | 현재 값과 용도 |
| --- | --- |
| `color.action.default` / `hover` | `#0F766E` / `#0A5C55` |
| `color.surface.canvas` / `default` / `accentSubtle` | `#F8FAF9` / `#FFFFFF` / `#E9F4F0` |
| `color.text.primary` / `secondary` / `accent` / `error` | `#17231F` / `#45544C` / `#0A5C55` / `#B42318` |
| `color.border.subtle` / `control` / `error` | `#DCE4DE` / `#71847A` / `#B42318`. subtle은 장식 구분용 |
| `color.focus.ring` | `#0A5C55` |
| 간격 | `2px` micro 예외와 `4, 8, 12, 16, 24, 32, 48, 64px` 스케일 |
| 컨트롤 높이 | sm `32px`, md `40px`, lg `48px`, touch `44px` |
| 모서리 | sm `4px`, md `8px`, lg `12px` |
| 테두리·포커스 | 기본 테두리 `1px`, 강한 선 `2px`, 포커스 outline `2px` + offset `2px` |
| 모션 | fast `0.15s`, normal `0.2s`, spinner `0.7s` |
| 굵기·비활성 투명도 | 400/500/600/700, disabled `0.55`, disabledInput `0.75` |

타이포그래피의 크기/줄높이는 caption `12/16`, bodySm `14/20`, body `16/24`, headingSm `20/28`, headingMd `24/32`, headingLg `32/40`, display `40/48px`다.

생성기는 토큰 경로를 `--ds-...` 이름으로 바꾸고 camelCase를 kebab-case로 변환한다. 예: `color.surface.accentSubtle` → `--ds-color-surface-accent-subtle`. 참조값은 CSS `var(...)`로 남기고 현재 dimension은 px, duration은 s 그대로 출력한다. DTCG 전체 사양을 지원하는 범용 변환기라는 뜻은 아니다.

접근성 정책은 본문 대비 4.5:1, 큰 글자와 필수 UI 경계·상태 대비 3:1을 목표로 한다. 색상만으로 오류·선택을 전달하지 않는다. 키보드 포커스, 실제 클릭 영역, 긴 번역 문자열과 확대·리플로를 함께 검토한다. `44px` 터치 목표와 WCAG의 최소 타깃 크기를 혼동하지 말고, `2px` 포커스 선만으로 AA/AAA 준수를 판정하지 않는다.

검증할 설계 질문:

- 현재 규모에서 원시 색상/의미 기반 색상 분리와 단일 패키지 구성이 충분한가?
- 토큰 이름·타입·참조가 일관적이며, 미존재 참조·순환 참조·잘못된 단위를 적절히 발견하는가?
- 색 토큰의 sRGB components와 hex 중 어느 값을 사용하는지 명확한가? 두 표현이 어긋날 때 감지되는가?
- 생성 CSS와 JSON이 어긋나도 검증이 성공할 수 있는가? 생성 전후 diff로 재현할 수 있는가?
- px 출력, 전역 `:root` 노출, 토큰 override 방식이 확대·호스트 앱 통합·후속 다크 모드에 적절한가?
- CSS·카탈로그에 남은 리터럴 값이 설명 가능한 예외인지, 값의 중복 원본인지 구분할 수 있는가?
- 대비 검사가 확인하지 않는 실제 배경 조합·투명도·브라우저 상태를 별도로 확인해야 하는가?

## 6. 컴포넌트 계약과 검증 지점

공통 원칙은 React 19의 ref를 포함한 native HTML props를 가능한 한 유지하는 것이다. 입력의 값·검증 규칙·오류 문구는 소비 앱이 소유한다. UI 패키지에 React Hook Form, 상태 관리, 라우터 의존성을 넣지 않는다. 실제 className 전달 위치나 ARIA 우선순위도 소비 계약의 일부로 검토한다.

| 컴포넌트 | 현재 공개 API·구현 요약 | 중점 검증 |
| --- | --- | --- |
| Button | native button props, primary/secondary/ghost, sm/md/lg, `isLoading`, leading/trailing icon. 기본 `type="button"`. 로딩 시 disabled·aria-busy, children 유지 | submit 전달, disabled/loading 중 동작 방지, 이름 유지, 긴 문구, 아이콘만 사용할 때 이름 책임, ref |
| Link | native anchor props, default/accent, `isExternal`. 외부 링크는 `_blank`와 시각적 ↗. `_blank`의 rel에 noopener/noreferrer 병합 | 기존 rel·target 처리, 라우터 어댑터 사용성, 새 창 안내의 접근성, ref |
| TextField | native input props에서 HTML `size` 제외. 필수 label, hint/error, ID 생성 및 설명 연결 | controlled/uncontrolled·required·disabled·readOnly·ref, 외부 describedby 병합, aria-invalid와 소비자 ARIA 우선순위, 지원 input type 범위 |
| Textarea | native textarea props, 필수 label, hint/error, 기본 rows=4, 세로 resize | TextField와 계약 일관성, ref·폼 연동, 긴 입력·오류·크기 변경 |
| Checkbox | native input props에서 type 고정. label/hint/error, `isIndeterminate`, 내부 ref와 전달 ref 연결 | checked/defaultChecked·Space·mixed 전환, DOM indeterminate 동기화, 객체/함수 ref와 React 19 cleanup 계약, disabled·label 클릭 |
| Badge | native span props, neutral/accent/error | 비상호작용 정책, 의미 있는 상태 문구, 긴 라벨, 동적 상태를 알릴 책임 |

`useFieldIds`는 `useId` 또는 명시 id를 사용해 label/hint/error를 연결하고 외부 `aria-describedby`를 병합한다. TextField·Textarea·Checkbox의 `className`은 현재 wrapper에 적용된다. 오류는 텍스트와 `aria-invalid`·`aria-describedby`로 표현하며, 오류 공지 시점이나 폼 전체 오류 처리는 소비 앱과의 책임을 검토한다.

공통 CSS는 `:focus-visible`, coarse pointer 컨트롤 높이 보정, `prefers-reduced-motion`을 포함한다. 네이티브 checkbox를 사용한다. 일부 정책이 코드·문서에 선언돼 있다는 사실과 실제 브라우저에서 검증됐다는 사실을 구분한다.

## 7. 패키징·소비 환경 검증

현재 UI 패키지는 `private: true`이며 이 프로젝트에서 npm 게시를 진행하지 않았다. 검토 중에 이 설정을 해제하거나 게시하지 않는다. 문서 앱과 Next 검증 앱도 private다. 루트의 `leejinw-design-system`, 내부 앱의 `@leejinw/docs`·`@leejinw/next-smoke`는 내부 workspace 이름이며 공개 패키지 이름과 구분한다.

| 공개 경로 | 현재 대상 |
| --- | --- |
| `@dev.leejinw/ui` | `dist/index.js` ESM, `dist/index.d.ts` |
| `@dev.leejinw/ui/styles.css` | 토큰과 컴포넌트 CSS인 `dist/style.css` |
| `@dev.leejinw/ui/fonts.css` | 선택적으로 가져오는 자체 호스팅 폰트 CSS |
| `@dev.leejinw/ui/tokens.json` | DTCG 토큰 JSON |

UI 빌드는 React·React DOM·JSX runtime을 external로 처리하고 결과 진입점에 `"use client"`를 붙인다. 타입 선언을 별도로 생성하며 폰트·OFL 라이선스를 복사한다. 패키지 `files`는 dist·tokens·README다. 소스 진입점의 CSS import와 소비 앱의 명시 CSS import가 최종 산출물에서 어떻게 동작하는지도 확인한다.

- ESM·exports·타입 선언·React peerDependencies가 실제 별도 설치 환경에서 해석되는가? CJS를 제공하지 않는 것이 현재 지원 범위에서 문제인지 판단한다.
- React가 중복 번들되지 않는가? CSS·폰트·라이선스 파일 경로가 압축물에서도 유효한가?
- CSS 로딩, tree shaking과 부수효과 처리, 전역 토큰·호스트 reset 간섭이 소비 앱에 예측 가능하게 작동하는가?
- 전체 진입점의 client 경계가 Next App Router에서 필요한가, 더 좁힐 실익이 있는가? SSR·hydration·ref·폼 연동이 실제로 유지되는가?
- `apps/docs/tsconfig.json`은 컴포넌트 타입을 소스로 매핑한다. 이것만으로 배포 타입 선언의 정상 동작을 입증하지 말고 Next 검증 앱·압축물 설치를 함께 본다.
- 현재 Next 예제는 Badge·TextField·Button만 소비한다. 빌드 성공을 6개 컴포넌트 전체의 브라우저 동작 검증으로 확대 해석하지 않는다.
- 공개 배포 전 필요한 메타데이터·라이선스 정책·버전 관리·자동 검증 항목을 구체적으로 제안한다. npm 계정의 소유권과 패키지 준비 상태는 별개다.

## 8. Figma·i18n·문서 운영 검증

Figma 파일: <https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=0-1>

페이지는 `00 Foundations`, `01 Components`, `02 Patterns & QA`다. 작업 당시 코드·Figma에 토큰 이름 72개를 대조했다는 기록이 있지만, 현재 값·변수 바인딩·변형까지 일치한다는 새 검증 증거로 취급하지 않는다.

토큰 변경 흐름은 **JSON 수정 → CSS 생성·검증 → Figma 변수 반영 → 시각 검토**다. 자동 양방향 동기화나 Code Connect 연결이 완성됐다고 가정하지 않는다. Figma 변수 이름은 JSON 경로를 `/`로 연결하며 CSS와 달리 camelCase 경로를 유지한다. Figma 숫자 표현은 불투명도 55/75와 시간 150/200/700ms, CSS 원본은 0.55/0.75와 0.15/0.2/0.7s다.

Figma 접근 환경에서 Pretendard Variable을 사용할 수 없어 `Preview / ...` 텍스트 스타일에 Noto Sans KR을 사용한 상태다. 웹의 Pretendard와 글꼴 모양·줄바꿈이 완전히 일치한다고 판정하면 안 된다. 폰트 사용 가능한 환경에서의 재대조와 사용자의 시각 승인이 남아 있다.

카탈로그는 로컬 KO/EN 문구와 `document.documentElement.lang` 전환으로 예시를 제공한다. 특정 i18n 프레임워크를 UI 패키지에 통합한 것은 아니다. Storybook·검증 앱의 한영 병기 표본은 비교 자료로 평가하되, 제품에서 한 언어를 선택해 전환한다는 정책의 충족 증거로 대신하지 않는다.

- Figma 접근이 가능하면 코드/변수/variant 이름, 상태별 값과 바인딩, 한영 긴 라벨과 화면 구성을 대조한다.
- 한영 전환 시 문구 누락, 접근성 이름과 lang의 불일치, 사용자 입력값 손실, 고정 높이·줄바꿈 문제를 확인한다.
- 문서가 props·기본값·ref/className 계약·상태·금지 용도·오류 처리 책임을 실제 소비자가 이해할 정도로 설명하는지 확인한다.

## 9. 실행 절차와 기존 검증의 한계

저장소 루트에서 실행한다. Node.js 22 이상과 pnpm 10.34.5를 사용하고, 정확한 의존성은 lockfile을 기준으로 한다. 설치·빌드로 생성된 파일을 커밋하지 않는다.

```sh
git status --short --branch
git rev-parse HEAD
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm storybook:build
```

`pnpm typecheck`는 먼저 UI 빌드를 실행해 소비 앱이 참조할 타입 선언을 만든다. `pnpm test`는 지정 대비 검사와 Vitest를 실행한다. 명령별 성공/실패·환경·미실행 사유를 기록하고, 기존 기록을 복사해 새 실행 결과로 쓰지 않는다.

브라우저 검증에는 `pnpm dev`의 <http://127.0.0.1:5173>, `pnpm storybook`의 <http://127.0.0.1:6006>을 사용한다. 압축물 검증은 `packages/ui`에서 `pnpm pack --pack-destination <임시 폴더>` 후, workspace 밖 임시 소비 프로젝트에서 필요한 React 의존성을 설치하고 수행한다. 이 작업은 npm 게시와 다르다.

이전 작업에서 보고된 결과와 한계:

| 항목 | 기존 증거 | 한계/재검토 요청 |
| --- | --- | --- |
| 설치·타입·린트·빌드 | 이름 변경 후 통과. UI·Vite·Next·Storybook 빌드 포함 | 현재 환경과 실제 산출물 계약을 독립 재확인 |
| Vitest | 4개 파일, 총 5개 테스트 통과 | Button 클릭·로딩, Link rel, TextField 설명 연결, Checkbox mixed/Space만 포함 |
| 색상 대비 | 지정한 10개 쌍 통과 | 전체 토큰 스키마·CSS 상태·투명도·브라우저 접근성 인증을 의미하지 않음 |
| 패키지 압축 | 새 이름으로 CSS·타입·폰트·OFL 포함한 압축물 생성 | 별도 설치 검증 기록은 있으나 새 이름의 설치·렌더링은 직접 재확인 권장 |
| Figma | 작업 당시 토큰 이름 72개 대조 기록 | 현재 변수 값·바인딩·모든 상태의 일치 여부는 별도 확인 |
| 화면·키보드 | 첫 Tab 포커스·카탈로그 언어 전환 확인 기록 | 320px·200% 확대·전체 순서·포커스 잘림 확인은 미완료 |
| 경고 | Vite/Storybook에서 `use client` directive 및 큰 Storybook chunk 경고 | 소비 결과에 미치는 영향과 경고 성격을 구분 |
| 자동 검증·게시 | GitHub Actions 추가와 npm 게시가 다음 작업 | 이 검토에서 완료된 것으로 표시하지 않음 |

현재 테스트 수를 목표로 삼아 같은 구현을 반복 검증하는 테스트를 늘리지 않는다. 빠진 사용자 계약에 실질적인 위험이 있을 때 필요한 행동 테스트를 권고한다. 코드 변경이 필요한 재현 테스트는 검토 보고서에 제안하고 원본을 수정하지 않는다.

수동 QA 체크리스트:

- [ ] 320 CSS px 폭에서 한국어/영어를 전환하고 가로 넘침·잘림·필수 정보 손실 확인
- [ ] 브라우저 실제 200% 확대에서 콘텐츠와 조작 가능 여부 확인. 임의 transform/폰트 크기 조절로 대체하지 않음
- [ ] 일반·넓은 화면과 긴 라벨/힌트/오류에서 레이아웃 확인
- [ ] 전체 Tab/Shift+Tab 순서, Enter/Space 동작, 포커스 표시·잘림·가림과 비활성 요소 처리 확인
- [ ] 체크박스 선택·mixed·disabled, 입력 required/readOnly/error, Button loading/disabled 확인
- [ ] reduced motion과 고대비/forced colors 환경에서 필요한 정보가 유지되는지 확인
- [ ] Figma와 웹 비교에서 폰트 차이를 분리하고 색·간격·크기·상태 일관성 확인

도구로 확인할 수 있는 항목은 직접 확인하고, 사용자의 최종 시각 승인과 기술 QA 결과는 따로 기록한다. 미완료 항목을 근거 없이 통과 처리하지 않는다.

## 10. 최종 보고 형식과 판정

보고서에는 아래 내용을 포함한다. 한국어로 작성하고 실제 문제를 먼저 제시한다.

1. **검토 범위**: 브랜치·HEAD·작업 트리 상태, 코드/문서/Figma/브라우저 중 직접 확인한 범위.
2. **핵심 판단**: 이 규모의 시스템에 구조와 정책이 적절한지, 라이트 v1·npm 출시 준비가 각각 어느 상태인지.
3. **지적사항 표**: ID, 심각도, 근거 파일:줄 또는 Figma 노드, 재현 조건, 실제/기대 결과, 영향, 최소 수정안.
4. **정책 결정이 필요한 항목**: 대안과 비용을 비교하고 추천안을 제시. 이미 합의한 방향을 뒤집는 제안은 근거를 명시.
5. **검증 증거**: 실행 명령·결과, 브라우저 환경과 조건, Figma 확인 내용, 미실행·접근 불가 항목.
6. **남은 작업**: 출시 전에 필요한 수정 / 후속 개선 / 사용자 시각 승인으로 구분.

심각도와 출시 판정:

| 수준 | 기준 |
| --- | --- |
| Blocker | 핵심 사용 불가, 설치/번들 실패, 중대한 접근성 실패 등으로 현재 출시를 막는 문제 |
| Major | 공개 API·ref·폼·토큰·소비 환경 계약의 결함 또는 실질적인 회귀 위험. 출시 전에 수정 필요 |
| Minor | 비차단 문서·표현·컨벤션 문제. 구체적인 영향과 이월 이유를 기록 |
| 제안 | 현재 결함으로 입증되지 않은 개선. 실패 사유와 분리 |

최종 상태는 `수정 필요`, `확인 범위 통과`, `미검증 포함` 중 근거에 맞게 작성한다. 미검증이 남아 있는데 전체 검증 완료라고 표현하지 않는다. 자동 명령 성공만으로 접근성 전체 준수나 Figma 일치를 선언하지 않는다. 결함이 없다면 그 사실과 남은 검증 한계를 명확히 쓴다.

수정 우선순위는 **소비자 기능·접근성 → 패키지 계약·SSOT → 문서·운영 일관성 → 확장 제안**이다. 현재 규모에서 불필요한 모노레포 도구, 테마 엔진, headless 라이브러리, 전역 상태나 API 계층을 추가하는 것을 해결책의 기본값으로 삼지 않는다.

## 11. 공식 참고 자료

외부 규범을 판단할 때 최신 원문을 확인한다. 이 목록은 프로젝트가 해당 사양 전체를 충족한다는 선언이 아니다.

- DTCG: <https://www.designtokens.org/>
- React input / ref: <https://react.dev/reference/react-dom/components/input>, <https://react.dev/reference/react-dom/components/common#ref-callback>
- Next.js use client: <https://nextjs.org/docs/app/api-reference/directives/use-client>
- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- ARIA Authoring Practices: <https://www.w3.org/WAI/ARIA/apg/>
- npm package.json: <https://docs.npmjs.com/cli/configuring-npm/package-json/>
- Pretendard: <https://github.com/orioncactus/pretendard>
