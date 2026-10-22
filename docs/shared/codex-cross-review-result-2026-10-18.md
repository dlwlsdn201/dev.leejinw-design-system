# Quiet Precision — Codex 독립 교차 검증 결과

- 실제 검토일: **2026-10-19, Asia/Seoul**. 파일명은 사용자 지정 `2026-10-18`을 유지했다.
- 검토자: Codex. Claude의 두 문서는 검증할 주장으로 취급했다.
- 최종 판정: **수정 필요**. 자동 검사 성공과 출시 준비 완료를 구분한다.
- 대상: `@dev.leejinw/ui@0.1.0`, 라이트 모드 v1. 소스·Figma 수정, 커밋·Push·npm 게시를 수행하지 않았다.

## 1. 검토 범위

### 1.1 기준과 작업 트리

실제 저장소 루트는 `/Users/leejinw/Documents/codes/ljw/design-system/dev.leejinw-design-system`이다. Codex 내부 복제본을 검토 대상으로 사용하지 않았다.

시작 시 직접 실행한 결과:

```text
$ git status --short --branch
## main...origin/main [behind 1]
?? docs/shared/
$ git rev-parse HEAD
f5a269b70bb005f618ef778c1816cc6b7ef5f265
$ git diff --name-only HEAD 2381598
PRD.md
README.md
packages/ui/package.json
```

`2381598`과의 차이는 저장소 이름 변경에 따른 링크 3줄이다. 컴포넌트·토큰·생성기·검증기·앱 코드는 동일하다. 로컬을 pull하거나 기존 문서를 변경하지 않았다. `docs/shared/`의 기존 요청서·1차 결과·시니어 의견서는 원래부터 미추적 상태였다.

### 1.2 직접 확인한 범위

- AGENTS → 원래 요청서 → 1차 결과 → 시니어 의견서 순서로 읽고 실제 소스와 대조했다.
- 잠금 파일 설치, 타입·린트·테스트·전체 빌드·Storybook 빌드를 실행했다.
- workspace 밖 임시 프로젝트에 실제 tarball을 설치해 TypeScript와 Vite 소비를 검사했다.
- React 19·RTL·JSDOM으로 상태·ARIA·ref·오류 DOM을 재현했다. 임시 테스트는 저장소 밖에서 실행했다.
- Chrome `155.0.8059.82`에서 카탈로그 KO/EN, 320/768/1440px, 키보드, Storybook 상태, reduced motion·forced colors 모의 환경을 검사했다.
- Chrome 게스트 창의 실제 페이지 확대 메뉴가 **200%**임을 확인하고 주요 영역·컴포넌트·입력 화면을 시각 확인했다. CSS transform·deviceScaleFactor를 확대 증거로 사용하지 않았다.
- Figma를 읽기 전용으로 조회해 변수 72개, component set 6개/variant 33개, 대표 6개 컴포넌트의 변수 바인딩·글꼴·크기, 현재 검토 프레임을 대조했다.

미검증: Safari·Firefox, 실제 Windows 고대비, iOS/Android 기기, VoiceOver/NVDA 음성 출력, 모든 Figma 노드의 모든 속성, 실제 사용자 시각 승인. Figma와 브라우저의 일부 검사가 성공했어도 이 영역까지 통과로 확대하지 않는다.

주의: `5173`은 이전 작업 폴더의 서버가 점유 중이고 `5174`도 사용 중이었다. 실제 저장소에서 `pnpm dev`를 실행한 결과 주소는 **`127.0.0.1:5175`**, Storybook은 **`127.0.0.1:6006`**이었다. 다른 복제본 화면을 현재 소스의 증거로 혼용하지 않았다.

## 2. 1차 결과 F-01~F-12 검증표

| ID | 독립 재현 판정 | 심각도 의견 | 직접 얻은 증거·해석 |
| --- | --- | --- | --- |
| F-01 | **재현됨** | Major 유지. 스크린리더 오독 주장은 제한 | Mixed Checkbox를 클릭하면 DOM이 `checked=true`, `indeterminate=false`, `aria-checked=mixed`가 된다. 다만 같은 Storybook 예제의 Chrome 접근성 트리는 `checked=true`였다. 모든 보조기술이 mixed로 읽는다고 단정할 수 없다. native checkbox에 이 ARIA를 쓰지 말라는 작성 규칙 위반은 별도로 성립한다. |
| F-02 | **재현됨** | Major 동의 | 실제 압축물을 별도 설치하고 `skipLibCheck:false`로 검사하면 `dist/index.d.ts(1,8): TS2882 ... './styles.css'`, exit **2**. dist에는 `style.css`만 있다. 프로젝트 자체의 타입 검사 성공은 이 계약을 보장하지 않는다. |
| F-03 | **재현됨** | 공개 게시 전 필수 준비 항목으로 동의 | `pnpm pack`에 코드 자체 LICENSE·license 필드가 없고 폰트 OFL만 있다. 라이선스 결정은 사용자 정책이며 MIT를 임의로 확정하면 안 된다. description/keywords/sideEffects/publishConfig를 전부 같은 심각도의 동작 결함으로 묶는 데는 반대한다. `private:true`는 현재 의도한 게시 방지 장치다. |
| F-04 | **재현됨** | Major 동의 | TextField·Textarea·Checkbox에 `aria-invalid="true"`만 전달하면 모두 최종 속성이 `null`이다. 오류 문구 없이 외부 폼 검증 상태를 전달할 수 없다. |
| F-05 | **재현됨** | 함수 재호출만으로는 Minor. C-01은 Major | 안정된 소비자 ref를 넘겨도 rerender 후 `node → null → node`. React가 ref 함수 교체 시 재연결하는 것은 정상 동작이므로 무조건 React 위반이라고 쓰면 안 된다. 별도로 callback 반환 cleanup이 유실되는 실질 결함을 C-01에서 확인했다. |
| F-06 | **재현됨(속성 부재)**. 실제 음성 공지 실패는 **재현 불가** | 문서 책임 경계 Minor 동의 | `error`를 나중에 추가하면 설명 ID는 연결되고 live region 수는 0이다. 스크린리더로 음성을 확인하지 않았으므로 ‘공지되지 않는다’를 확정하지 않는다. 개별 오류마다 alert를 기본 추가하는 수정은 중복 공지 위험이 있다. |
| F-07 | **재현됨** | Minor 동의 | 현재 로컬 README:51은 `@leejinw`, README:5·PRD:107·패키지 repository는 이전 저장소명이다. 기준 커밋 `2381598`에서는 링크 3줄만 수정됐고 README:51의 과거 scope는 남는다. 로컬 지연과 원격에도 남는 문구를 구분한다. |
| F-08 | **재현됨** | 잘못된 색도 통과하는 부분은 **Major로 상향** | 원본 복사본 4개에 각각 components 불일치, 대비 쌍의 hex=`#ZZZZZZ`, 미존재 참조, 잘못된 타입 참조를 넣었다. 모두 생성 exit 0, 검증 exit 0, `10 color contrast pairs passed`. invalid hex에서 NaN이 생겨 `< minimum`을 통과하는 것이 특히 문제다. |
| F-09 | **재현됨(조건부)** | 긴 라벨 손실은 **Major로 상향**. 높이 차이 자체는 설계 판단 | 실제 카탈로그는 CSS 누락(C-02)으로 먼저 분리해야 한다. 브라우저에 UI CSS만 임시 로딩한 비교 조건에서 320px 버튼 width=230/clientWidth=228, 한글 scrollWidth=338·영문=334, 텍스트가 왼쪽 -64/오른쪽 384px까지 넘쳤다. 정상 스타일에서 입력44px·md 버튼40px 차이도 확인했으나 이것만으로 기능 결함은 아니다. |
| F-10 | **재현됨(빈 이름 사용 가능·새 창 문구 없음)** | 소비 가이드 Minor 동의, 일반적인 WCAG AA 위반 단정에는 반대 | leadingIcon만 전달한 Button은 접근성 이름이 빈 버튼으로 조회된다. `aria-label`을 지원하므로 필수 사용 계약을 문서화해야 한다. 외부 Link의 접근성 이름에는 ↗가 제외된다. 새 창 예고는 W3C G201에서 advisory이며 이 부재만으로 2.4.4 실패를 확정하지 않는다. |
| F-11 | **재현됨(테스트 구성)** | 제안 유지 | 직접 실행한 테스트는 4파일/5개. Textarea·Badge 전용 테스트는 없다. 그러나 파일 부재 자체는 결함이 아니며 Badge 단순 렌더 테스트를 의무화하지 않는다. F-01/F-02/F-04/C-01의 실제 계약과 재현 사례를 회귀 방어해야 한다. |
| F-12 | **재현 안 됨(현재 동작 결함 기준)** | 제안 유지 | 별도 disabled checkbox CSS와 forced-colors 전용 CSS가 없는 사실은 확인했다. 하지만 native control은 브라우저가 상태를 그린다. Chrome forced-colors 모의 검사에서 체크박스·입력 경계·포커스는 보였다. 실제 OS·보조기술 전체 통과를 뜻하지 않는다. |

1차 보고서 총평의 ‘Major 3건’은 표의 F-01~F-04 **4건**과도 불일치한다. 분류 숫자를 그대로 인계하지 않는 편이 좋다.

### 2.1 대표 실행 증거

상태·ref는 원본 번들을 import하고 React 19·RTL의 render/rerender/unmount와 click을 실행했다. StrictMode가 없는 격리 조건도 사용해 개발 모드의 이중 실행과 구분했다.

```text
Mixed checkbox:
before {checked:false, indeterminate:true, ariaChecked:"mixed"}
after  {checked:true,  indeterminate:false, ariaChecked:"mixed"}
Chrome AX after click: checked = "true"

aria-invalid input without error:
TextField = null / Textarea = null / Checkbox = null

stable callback ref after rerender: ["node", "null", "node"]
returned cleanup after unmount: attaches=1, cleanup=0 (expected 1)

dynamic error: liveRegions=0, aria-describedby="_r_6_-error"
icon-only Button queried by role with name "": found

Token mutation             generate exit / validate exit
components mismatch       0 / 0
hex #ZZZZZZ in action     0 / 0
space.1 -> missing alias  0 / 0
space.1 -> color alias    0 / 0
all validator outputs: "10 color contrast pairs passed"
```

압축물 소비는 임시 폴더에서 아래 순서로 직접 실행했다. React 19.3.1·TypeScript 6.0.3·Vite 8.3.4를 설치하고 source path alias를 쓰지 않았다.

```sh
# packages/ui에서 실행. 임시 목적지는 저장소 밖이다.
pnpm pack --pack-destination /private/tmp/qp-codex-review-20261019
# 임시 소비 프로젝트의 dependencies는 위 tarball을 file:로 참조한다.
pnpm install --ignore-scripts
pnpm exec tsc --pretty false
# skipLibCheck:false, strict:true, moduleResolution:Bundler
# 결과: TS2882 ... dist/index.d.ts(1,8) ... './styles.css', exit 2

pnpm exec vite build --outDir dist-with-explicit-css
# styles.css 명시 import: CSS 파일 1개, 8.26 kB
pnpm exec vite build --outDir dist-no-css
# UI JS만 import한 별도 조건: CSS 파일 0개
```

### 2.2 최소 수정안의 부작용

- **F-01:** `aria-checked` 제거는 동의한다. native `indeterminate` 설정을 유지하고, 클릭·Space 이후 checked/mixed 전환 정책을 테스트해야 한다. 테스트를 DOM 속성만 확인하는 것으로 축소하지 않는다.
- **F-02:** ‘소스 진입점의 CSS import 한 줄 제거’만 적용하면 위험하다. 임시 소스 복사본에서 직접 제거해 빌드하니 CSS가 8.27→5.58 kB가 되고 **토큰 선언은 사라지지만 `var(--ds-...)` 사용은 남았다**. 타입 선언에서만 자산 import를 제거하거나, CSS 생성 진입점을 분리해 토큰을 계속 포함해야 한다. 소비 앱에는 명시 CSS import 계약을 통일한다. wildcard CSS 선언으로 존재하지 않는 내부 경로를 숨기는 것은 단독 해결책이 아니다.
- **F-04:** error가 있으면 true, 없으면 소비자 `aria-invalid`의 boolean·문자열 값을 보존하는 정책을 명시한다. 외부 describedby 병합도 보존해야 한다.
- **F-05/C-01:** useCallback만 추가해도 반환 cleanup 유실은 해결되지 않는다. callback ref의 반환값·null 해제·객체 ref와 indeterminate 갱신을 함께 처리해야 한다. effect를 ref로 무조건 치환하면 같은 prop의 반복 render에서 native 선택 상태를 재설정할 수 있으므로 제어 계약부터 정한다.
- **F-08:** 전체 DTCG 엔진 도입은 필요 없다. 현재 지원 타입의 필수 구조·finite 숫자·색 형식·참조 존재/타입/순환과 색 표현 일치를 검사하고, 생성물 동기를 별도로 확인하면 된다.
- **F-09:** nowrap만 지우면 다중 줄의 높이·아이콘·spinner 정렬을 다시 검증해야 한다. keep-all만 추가하면 긴 영단어·URL이 넘칠 수 있으므로 overflow-wrap과 함께 표본 검증한다.
- **F-03:** `private` 해제·MIT 선택·npm 게시를 검토자가 자동 적용하지 않는다. `sideEffects:false`를 무작정 추가하는 것은 CSS 유실을 새로 만들 수 있다.

## 3. 추가 발견 C-01부터

| ID | 심각도 | 근거 | 독립 재현 조건 → 결과 | 영향·최소 수정 방향 |
| --- | --- | --- | --- | --- |
| C-01 | **Major** | `packages/ui/src/components/Checkbox.tsx:33-36` | `ref={node => { if (node) return release; }}`로 mount→unmount. attaches=1, release=0. 소비자 반환값을 wrapper가 버린다. | React 19의 유효한 callback-ref cleanup 계약을 잃는다. 내부 ref 전달에서 cleanup을 합성·반환하고 객체 ref·null 계약도 보존한다. F-05의 함수 재생성 문제보다 중요하다. |
| C-02 | **Major** | `apps/docs/src/main.tsx:4-6`, `packages/ui/src/index.ts:1`, `packages/ui/vite.config.ts` | 실제 저장소의 pnpm dev/5175에서 action token 값은 빈 문자열, 버튼25px·입력24px. UI CSS를 브라우저에만 주입하자 token=#0f766e, 버튼40px·입력44px·지정 포커스가 복원됐다. | 패키지 번들이 CSS를 추출하지만 앱은 `import '@dev.leejinw/ui'`만 하므로 CSS가 로딩되지 않는다. main에 명시 `styles.css` import가 필요하다. C-02는 sideEffects 미설정과 다른 원인이다. 성공한 build가 올바른 화면을 보장하지 못했다. |
| C-03 | **Major — Figma 검토 산출물** | Figma `7:3`, 행 `15:6`, `15:49`, `15:80` 등 | 행 높이=1px/FIXED인데 자식 bottom=300/194/246px. 다음 섹션이 덮여 Size·상태 예제가 가려진다. 읽기 API와 스크린샷으로 확인했다. | 직전 Codex 그룹 정리 작업이 중단된 상태에서 생긴 문제다. 이번 검토 중 만든 변경이 아니다. 행을 내용 높이에 맞추고 전체 프레임을 재검증해야 한다. 토큰 대조 통과로 시각 승인할 수 없다. |
| C-04 | **Minor — 크기 계약·Figma 동기** | `ui.module.css:81`, `apps/docs/src/app.css:2`, Figma Badge `7:95`, `7:97`, `7:99` | Badge Neutral은 Storybook의 content-box 환경에서28px, border-box를 적용한 카탈로그 격리 조건에서는24px가 된다. Figma는19px이고 Error는21px다. | 호스트 reset과 Figma에 따라 최종 외곽 높이가 다르다. 토큰이 외곽 최소 높이인지 먼저 정하고 package의 box-sizing/토큰 적용과 Figma min-height를 맞춘다. 이 항목 하나만으로 키보드·접근성 실패라고 주장하지 않는다. |

C-01 근거는 [React callback ref 규약](https://react.dev/reference/react-dom/components/common#ref-callback)이다. React는 ref callback이 반환한 cleanup을 해제 때 호출하며, 함수 참조가 달라지면 재연결한다. 확인일: 2026-10-19.

## 4. 시니어 의견서에 대한 독립 의견

공식 자료 확인일은 모두 **2026-10-19**다. 아래에서 ‘권장’은 규범상 필수와 구분한다.

### 4.1 번복 1 — 타입 토큰을 v1 전에 px→rem으로 전환

**찬성: 권장 설계 결정. ‘px이므로 WCAG 실패’라는 근거에는 반대.** 소비자 0개인 지금 font-size와 line-height 출력을 사용자 글꼴 설정을 존중하도록 정리할 비용이 낮다. JSON/Figma px 원본을 유지하고 CSS 변환 기준(기본16px 환산)을 문서화할 수 있다. 고정 root font-size로 사용자 설정을 다시 막지 말아야 한다.

rem은 root 글꼴에 상대적인 단위이며 OS의 모든 글꼴 설정을 보장하는 스위치는 아니다. [CSS Values](https://drafts.csswg.org/css-values-4/#font-relative-lengths)는 단위의 의미를 정하고, [WCAG Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)와 [G142](https://www.w3.org/WAI/WCAG22/Techniques/general/G142.html)는 zoom도 적합한 경로로 인정한다. 따라서 단위 교체 자체를 독립 Major로 분류하지 않는다. 출시 전 글꼴 설정·200% 확대·높이·긴 라벨을 함께 검증하는 방식이 적절하다. 이번 실제 Chrome 200% 확대에서도 px 텍스트 자체는 확대됐다.

### 4.2 번복 2 — sideEffects 누락을 CSS 동작 결함으로 분류

**반대. 지금 입증된 결함은 CSS 로딩 계약(C-02)이다.** `sideEffects`를 생략한 현재 tarball에서도 명시 CSS import를 넣은 Vite production build에는8.26kB CSS가 남았다. import를 빼면0개다. dist/index.js 자체에 CSS import가 없으므로 `sideEffects`만 추가해도 C-02는 해결되지 않는다.

[webpack 공식 문서](https://webpack.js.org/guides/tree-shaking/)의 CSS 유실 예제는 잘못된 `sideEffects:false`를 전제로 한다. 생략과 false를 같은 것으로 취급하면 안 된다. `sideEffects:["**/*.css"]`는 CSS 부수효과를 명시하면서 JS tree shaking을 개선할 유용한 준비지만, 정확한 소비 번들에서 검증해야 한다. 이 결과를 webpack·모든 bundler에서의 무조건 안전으로 확대하지 않는다.

### 4.3 번복 3 — data-theme 선택자와 color-scheme을 지금 준비

**color-scheme의 책임 명시에는 찬성, 미래 테마 선택자를 출시 필수로 추가하는 것에는 반대.** 카탈로그에는 이미 `app.css:1`에 `color-scheme:light`가 있다. UI 패키지/Storybook은 이를 자체 제공하지 않으며 Storybook 체크박스 computed 값은 normal이었다. dark 선호를 emulation해도 Chrome에서 선언이 없는 것만으로 결함이 재현되지는 않았다.

[CSS Color Adjustment](https://drafts.csswg.org/css-color-adjust/#color-scheme-prop)는 네이티브 UI 색상 선택 의미를 정의한다. 소비 앱 문서 전체를 라이브러리가 강제로 light로 바꿀지, opt-in 테마 컨테이너에서 선언할지를 정해야 한다. `:root, [data-theme="light"]`만 추가하면 중첩 테마·토큰 alias 해석·상속·미래 dark 팔레트가 모두 해결되는 것은 아니다. 다크 모드 실제 범위를 정할 때 설계하고, 현재 light 지원 범위는 README에 명시하는 쪽을 권한다.

추가로 `@layer` 도입을 ‘순서 싸움이 해결되며 비용0’이라고 볼 수 없다. [CSS Cascade의 레이어 순서](https://drafts.csswg.org/css-cascade-5/#layer-order)에 따라 **일반 선언에서 레이어 밖 reset도 레이어 안 컴포넌트를 이길 수 있다**. 이는 오히려 외부 reset 간섭을 키울 수 있다. 호스트 reset·Tailwind와의 순서 계약을 검증한 후 도입한다.

### 4.4 S-3/S-4 — 카탈로그의 한글 자간과 토큰 외 스케일

**정책 불일치 지적에는 부분 찬성. 구체적인 설명에는 반대할 부분이 있다.** `.hero h1`은 KO/EN 어느 모드에서도 항상 영문 `Quiet Precision.`이다. `-.092em`을 한글 hero 제목에 적용했다고 설명한 것은 현재 DOM과 다르다. 한글 subtitle `-.035em`, section h2 `-.06em` 등은 실제 존재하므로 시각 재검토할 대상이다. 특정 자간 범위를 보편적 정답으로 선언하지 않는다.

550/580/630/650/750은 variable font에서 표현 가능한 값이다. 시스템 토큰과 다른 값이라는 점은 맞지만 유효하지 않은 굵기는 아니다.10·11px 역시 그 수치만으로 WCAG 실패가 확정되지는 않는다. 읽기 편의와 문서 역할 관점에서는 줄이는 것이 좋다. 카탈로그를 시스템 사용 예제로 계속 소개하려면 기본 콘텐츠는 시스템 토큰을 쓰고, 영문 wordmark/hero의 브랜드 예외는 `--site-*` 등으로 명시하는 권고에 찬성한다.

이 판단의 전제는 정상 스타일 로딩이다. 현재 화면은 C-02 때문에 token 기반 색·글꼴·포커스가 적용되지 않아, 시각 승인은 CSS 복원 후 다시 받아야 한다. 텍스트 확대·간격 조절은 [WCAG Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), [Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)처럼 결과를 검사한다.

한국어 음절 단위 줄바꿈은 재현됐다. 200% 원본 화면에서 힌트의 마지막 `세요`가 별도 줄로 떨어지는 모습도 확인했다. 다만 이것은 자연스러운 한국어 기본 줄바꿈 동작일 수 있어 곧바로 접근성 결함이라고 단정하지 않는다. `keep-all`과 긴 URL용 wrap 정책은 실제 라벨·본문에 나눠 적용하고 넘침을 검사하는 것이 적절하다.

### 4.5 S-11 — 원시 중성색 이름을 척도명으로 변경

**명명 정리 권고에는 찬성, 다크 모드의 전제·출시 필수라는 주장에는 반대.** primitive의 secondary/control/border는 역할 이름이어서 semantic 층과 혼동할 여지가 있다. 숫자 척도로 바꾸면 명료해질 수 있지만, 현재 의미 토큰의 alias 대상은 기존 이름을 유지해도 재매핑할 수 있다.

[DTCG Format](https://www.designtokens.org/tr/2025.10/format/)은 참조·그룹을 정의하지만 모든 원시 색을 반드시100…900으로 이름 붙이라는 규칙은 없다. 광도·순서 기준 없이 숫자만 붙이면 개선도 제한적이다. 변경하면 CSS/JSON 공개 export·Figma 변수/바인딩을 함께 이행해야 한다. 현재 원본 검증(F-08)이 더 우선이다.

### 4.6 체크박스 네이티브 유지 vs appearance:none

**네이티브 유지에 찬성.** 개인용 기본 시스템에서는 플랫폼 차이를 수용하고 browser의 checked/disabled/high-contrast 동작을 활용할 실익이 크다. 사용자 시각 요구가 native 외형을 허용하지 않는다고 확정된 경우에만 custom appearance를 도입한다.

Chrome Storybook에서 checkbox20px·label24px, coarse pointer 모의 조건에서는 label44px였다. 고대비 모의 환경에서도 native 외곽과 포커스가 보였다. 이것은 실제 Windows·Safari 검증의 대체물이 아니다. [React input](https://react.dev/reference/react-dom/components/input)과 [HTML/ARIA의 native checkbox 규칙](https://www.w3.org/TR/html-aria/#el-input-checkbox)을 기준으로, 우선 F-01/C-01을 고쳐 네이티브 의미론과 ref 계약을 정확히 유지해야 한다.

시니어 문서 S-7의 ‘24px 기준을 넉넉히 충족’도 모든 링크·타깃을 측정하기 전에는 일반화할 수 없다. [WCAG Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)는 예외와 간격 조건을 포함한다.

### 4.7 §6 바꾸지 말아야 할 것

- **찬성:** 단일 UI 패키지·CSS Modules·native wrapping·소비 앱 i18n 소유, OKLCH 도입 보류.
- **현재 유지에 찬성:** 전체 `use client`.6개 규모에서 분리는 급하지 않다. 다만 ‘Checkbox만 훅을 쓴다’는 1차 설명은 틀렸다. TextField·Textarea도 내부 useFieldIds→useId를 사용한다. [Next.js use client](https://nextjs.org/docs/app/api-reference/directives/use-client)는 경계의 의미를 설명한다.
- **조건부 반대:** ‘첫 소비 앱이 요구할 때까지 반드시6개만’이라는 확장 금지. 사용자는 이미 Select·Modal·Dropdown·Tooltip·Date/RangePicker 등의 필요를 제기했다. 현재 결함 수정과 새 기능 구현은 분리하되, 다음 범위는 사용 빈도와 overlay/선택 패턴의 의존 관계로 정할 수 있다. 이 검토에서는 추가 컴포넌트를 만들지 않았다.
- **별도 이견:** Textarea의 `field-sizing:content`를 기본 추가하는 것은 자동 높이 확장을 후속으로 둔 PRD 계약을 바꾼다. 최신 CSS가 지원된다는 이유만으로 비용 없는 보완으로 분류하지 않는다.

## 5. 브라우저·Figma 검증 결과

### 5.1 브라우저 조건과 수동 QA 7항목

카탈로그 원본과 CSS 임시 주입 비교 조건을 구분했다. 임시 주입은 CSS 원인·잠재 레이아웃을 분리하기 위한 **페이지 메모리상의 실험**이며 소스 수정이나 실제 해결이 아니다.

| 요청서 §9 항목 | 직접 수행과 결과 | 판정·한계 |
| --- | --- | --- |
| 1.320px 한영 | KO/EN 모두 root scrollWidth=320. 현재 일반 문구에서 문서 가로 넘침은 없었다. 정상 CSS 격리 조건의 긴 버튼 라벨은 뷰포트 양옆으로 넘어갔다. | C-02/F-09로 수정 필요. 기본 문구만의 reflow 성공을 긴 문구까지 확대하지 않음 |
| 2.실제200% | Chrome 게스트 창에서 확대 버튼 ‘200%’ 확인. hero→Components→입력 화면을 직접 봤고 주요 내용은 확대돼 조작 가능했다. | CSS 누락 상태를 시각 승인하지 않음. 전체 상태×언어 조합의200% 검증은 미완료 |
| 3.다양한 폭·긴 문구 | 768/1440px KO/EN 가로 넘침 없음. 긴 한영 버튼과 한글 무공백 표본의 음절 줄바꿈 확인. | F-09 수정 후 정상 스타일 전체 폭 재확인 필요 |
| 4.키보드·포커스 | 전체 Tab 순서: wordmark→nav2→KO/EN→enabled buttons3→links2→inputs2→textarea→checkbox. disabled/loading은 제외. Shift+Tab 역방향, Checkbox Space, Link Enter, Storybook Button Enter/Space 클릭2회 확인. | 원본 카탈로그 header의 token 기반 outline이 유효하지 않아 computed outline-style=none. Storybook·CSS 격리 입력의2px/offset2px 포커스는 확인. 모든 zoom·고대비 조합은 미완료 |
| 5.필드·상태 | Storybook mixed 클릭, disabled input, textarea error, Button loading(disabled=true/busy=true/이름 유지), native props 전달 확인. | required/readOnly는 RTL/JSDOM에서 두 필드 모두 true·값 유지 확인. 실제 브라우저의 전체 상태 조합·사용자 확대 입력 검증은 부분 수행 |
| 6.모션·고대비 | CSS 격리 상태에서 spinner animation이 reduced-motion 시 none으로 변함. forced-colors 모의 환경에서 native 경계·문구·포커스를 시각 확인. coarse pointer label44px 확인. | Chrome emulation 결과. 실제 Windows·기기·SR는 미검증. 원본 docs는 CSS 누락으로 spinner 자체가 보이지 않음 |
| 7.Figma 대조 | 변수값72개, component set6/variant33, 대표 바인딩·폰트·크기, 검토 프레임 스크린샷 확인. | 토큰값은 일치하지만 C-03/C-04와 상태·폰트 차이가 있어 전체 일치 판정 불가 |

한영 전환 후 `html.lang=en`과 입력값 `입력 유지 확인` 유지도 확인했다. Storybook URL args만 바꿔 required/readOnly를 설정하려던 시도는 원하는 인자를 적용하지 못했으므로 검증 증거에서 제외하고 RTL/JSDOM으로 다시 확인했다.

### 5.2 Figma 값·variant·바인딩

파일: [Quiet Precision](https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA/Untitled?node-id=7-3).

- 컬렉션: Color Primitives(Value), Color(Light), Layout(Value), Typography(Value).
- JSON72개 ↔ 변수72개. alias를 해석하고 duration s→ms, opacity 0…1→0…100을 정규화했다. 숫자/색의 부동소수점 오차 허용 범위0.001에서 불일치0개다. 이는 현재 정의값의 일치이며 생성기 검증(F-08)이 충분하다는 뜻이 아니다.
- Button18개(3 size×3 appearance×2 state), TextField3개, Textarea3개, Checkbox4개, Badge3개, Link2개로 총33개다.
- Button sm/md/lg의32/40/48px와 TextField 내부 input44px는 코드의 현재 설계와 일치한다. 입력44/버튼40을 독립 구현 실수로 단정한 의견에는 반대한다.
- 코드가 지원하는 Button loading과 Checkbox mixed, 외부 Link의 예고·포커스/hover 표본 등을 Figma variant 전체가 포괄하지는 않는다. 정책·예제 누락과 기능 미구현을 구분해야 한다.
- 대표 TextField Input `7:47`과 Checkbox Control `7:80` 등의 색·선·간격·모서리에는 실제 변수 바인딩이 있었다.72개 토큰 존재만 보고 전체 노드 바인딩을 통과 처리하지 않았다.
- Preview 텍스트 스타일은 Noto Sans KR이나 대표 main component의 텍스트는 **Inter**였다. 웹 기준 Pretendard와의 차이는 Noto만이 아니다. 한국어 실제 표본과 line-height 대조가 남는다.
- Badge19/21px 대 코드 외곽24/28px 차이(C-04), 행 높이1px로 예제가 가려지는 현재 검토 화면(C-03)을 확인했다.

**Figma 작업 이력 주의:** `15:*` 그룹 프레임은 직전 사용자 피드백 반영 작업에서 생겼고, 높이 수정 완료 전에 이번 읽기 전용 검토 요청이 들어왔다. 본 검토에서는 파일을 고치지 않았다. 따라서 이 보고서는 ‘그룹 정리 완료’나 ‘Figma 시각 검증 통과’를 주장하지 않는다.

### 5.3 증거 파일

별도 [증거 폴더](codex-cross-review-evidence-2026-10-18/)에 원본 수치 JSON과 아래 이미지를 보관했다. Figma는 해당 노드 링크와 API로 읽은 구조 JSON을 참조한다.

- [원본 카탈로그: UI 스타일 미적용](codex-cross-review-evidence-2026-10-18/catalogue-unstyled.png)
- [브라우저에만 CSS를 주입한 비교](codex-cross-review-evidence-2026-10-18/catalogue-temporary-css.png)
- [320px 긴 라벨 넘침](codex-cross-review-evidence-2026-10-18/styled-long-label-320.png)
- [고대비 모의 환경](codex-cross-review-evidence-2026-10-18/styled-forced-colors.png)

## 6. 최종 판정과 검증 기록

**수정 필요.** 자동 명령은 성공하지만 F-02의 별도 소비 타입 오류, F-04의 접근성 상태 손실, C-01의 ref cleanup 계약, C-02의 실제 카탈로그 스타일 누락, F-09의 긴 문구 손실이 남아 있다. Figma도 C-03 때문에 검토 산출물로 사용할 수 없는 부분이 있다.

| 직접 실행 | 결과 |
| --- | --- |
| pnpm install --frozen-lockfile | 성공, 기존 lockfile 유지. esbuild 빌드 스크립트 무시 경고 |
| pnpm typecheck | 성공. UI 빌드와 세 workspace 검사 |
| pnpm lint | 성공 |
| pnpm test | 대비10쌍,4파일5테스트 성공 |
| pnpm build | UI·Vite·Next 성공. use client 경고 |
| pnpm storybook:build | 성공. use client·chunk 크기 경고 |
| tarball 설치 후 pnpm exec tsc --pretty false | **실패 exit2**, F-02 재현 |
| 독립 소비 Vite build | explicit CSS:1개 / JS만:0개 CSS. sideEffects 생략이 곧 삭제라는 주장 반박 |
| 토큰 복사본4종 생성·검증 | 모두 성공으로 종료해 F-08의 검증 공백 확인 |
| git diff --exit-code | 검증 명령 종료 후 exit0. tracked 소스·생성 CSS 변경 없음 |

재현용 스크립트·변조 토큰·소비 프로젝트·가상 수정 소스는 저장소 밖 임시 폴더에만 만들고 검토 후 삭제했다. 최종 저장소 추가물은 이 보고서와 증거 파일뿐이다. 기존 Claude 문서는 보존했다. npm 계정·토큰을 조회하거나 Figma 캔버스를 수정하지 않았다.

## 7. 출시 전 필수 수정 목록 — 단일본

우선순위는 사용·소비 계약 → 접근성·검증 → 시각 승인·배포 준비 순서다. 아래 ‘확인’도 통과해야 해당 출시 단계가 완료된다.

1. **F-02 + C-02: CSS·타입 소비 계약 정리.** 배포 d.ts의 잘못된 CSS 경로를 제거하면서 CSS 산출물의 토큰을 보존한다. Vite 카탈로그에 명시 스타일 로딩을 적용하고, source alias 없는 tarball 소비 타입/브라우저 검사를 통과시킨다.
2. **F-04 + C-01 + F-01: 필드·Checkbox 계약 수정.** 소비자의 aria-invalid 보존, callback ref cleanup 전달, native checkbox ARIA 중복 제거와 mixed 갱신 정책을 정한다. 실제 실패 사례 중심 회귀 테스트를 추가한다.
3. **F-09: 긴 라벨·리플로 보장.** 320px·200% 확대·한영·아이콘·loading에서 손실 없는 버튼 줄바꿈/높이 계약을 정하고 재검증한다.40↔44px는 시각 정책을 결정하되 차이 자체를 기능 결함으로 처리하지 않는다.
4. **F-08: 검증기가 잘못된 원본을 실패로 반환하도록 보강.** finite 대비값, 색·타입·전체 참조 유효성, components/hex 일치와 생성물 동기 검사. full DTCG 엔진 도입은 불필요하다.
5. **C-03 + C-04: Figma 검토 화면과 크기 기준 정리.** 겹침을 고치고 Badge 외곽 크기·reset 책임·대표 상태·글꼴 대체를 문서화한다. CSS를 복원한 웹과 다시 대조한 후 사용자 시각 승인을 받는다.
6. **F-03 + F-07 + F-06/F-10: 공개 배포 정책·가이드 확정.** 사용자가 라이선스를 결정하고 배포물에 반영한다. 과거 이름과 오류 공지·아이콘 이름·새 창 안내의 소비자 책임을 명확히 한다. 게시 요청 시에만 private 해제와 publishConfig를 적용한다.
7. **반복 검증 게이트와 남은 QA.** GitHub 자동 검증에 설치·타입·린트·행동 테스트·빌드·토큰 diff·tarball 소비 검사를 연결한다. 정상 스타일로7항목 QA를 재완료하고 미지원 브라우저/기기 범위를 명시한다. 사용자가 승인한 후 npm 게시 및 실제 설치 확인을 별도 진행한다.

출시 필수와 구분할 권장 설계 결정: font-size/line-height의 rem 출력은 **v1 전에 처리하는 것을 권장**한다. 그러나 px 자체를 WCAG 실패로 분류하지 않는다. 미래 data-theme 선택자, primitive 숫자명, 자동 Textarea 높이, 전체 @layer 도입, 새로운 복합 컴포넌트는 위 실제 결함과 별도 범위로 결정한다.
