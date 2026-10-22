# Claude Code 교차 검증 결과 — Quiet Precision (1차)

- 작성일: 2026-10-18
- 검토자: Claude Code (Sonnet 5.5)
- 최종 상태: **수정 필요** (Major 3건, 일부 영역 미검증)

## 1. 검토 범위

| 항목 | 내용 |
| --- | --- |
| 브랜치 / HEAD | `main` / `f5a269b` (로컬은 `origin/main`보다 1커밋 뒤) |
| 기준 코드 | 요청서의 `2381598`은 로컬에 없어 `git fetch`로 확인. `f5a269b..2381598` 차이는 `PRD.md`·`README.md`·`packages/ui/package.json`의 저장소 링크 3줄뿐이고 컴포넌트·토큰·스크립트는 동일 |
| 작업 트리 | 시작·종료 모두 미추적 `docs/shared/`만 존재. 소스 변경 없음. 행동 재현용 임시 테스트를 `packages/ui/src/__review__/`에 만들었다가 삭제했고 `git status`로 확인 |
| 직접 확인 | 컴포넌트·CSS·토큰·스크립트·빌드 설정·README/PRD 소스 읽기, 전체 검증 명령 실행, 압축물 설치·SSR·타입 해석, 임시 행동 테스트 |
| **미검증** | 브라우저 렌더링(320px, 200% 확대, Tab 순서, forced-colors, reduced motion), Figma 파일 전체, 사용자의 시각 승인. 아래 CSS 기반 의심은 모두 "가설"로 표시 |

## 2. 핵심 판단

- **구조·정책**: 이 규모(컴포넌트 6개, 개인 사용)에는 적절하다. 단일 패키지, 토큰 JSON → CSS 생성, CSS Modules, native props 계승, 소비 앱이 i18n을 소유하는 방향은 과하지 않다. 추가 도구는 필요 없다.
- **라이트 v1**: 코드 계약은 대체로 안정적이다. 다만 Checkbox의 ARIA 문제(F-01)와 소비자 `aria-invalid` 무시(F-04)는 출시 전에 고치는 편이 좋다. 브라우저 QA는 미완료다.
- **npm 출시 준비**: 아직 아니다. 배포 타입 선언의 CSS import(F-02), 라이선스 부재(F-03), 자동 검증 부재가 남았다.

## 3. 지적사항

| ID | 심각도 | 근거 | 재현 조건 | 실제 → 기대 | 영향 | 최소 수정안 |
| --- | --- | --- | --- | --- | --- | --- |
| F-01 | Major | `Checkbox.tsx:47`, `:29-31` | `<Checkbox isIndeterminate />`(비제어)를 클릭 | 클릭 후 네이티브 `indeterminate=false`, `checked=true`인데 `aria-checked="mixed"`가 남음(재현 확인). 기대: 보조기술이 "체크됨"을 읽음 | 스크린 리더에 잘못된 상태 전달. ARIA in HTML은 네이티브 checkbox에 `aria-checked` 사용을 금지하며, `input.indeterminate`는 이미 mixed로 노출됨. 기존 테스트가 `aria-checked`를 단언해 잘못된 계약을 고정 | `aria-checked` 제거, `indeterminate` DOM 속성만 사용. 테스트는 `indeterminate` 값과 사용자 클릭 뒤 상태로 교체 |
| F-02 | Major | `src/index.ts:1`, 산출물 `dist/index.d.ts:1` | 압축물을 workspace 밖에 설치하고 `skipLibCheck:false`, `strict`로 `tsc` | `error TS2882: ... './styles.css'` (재현 확인). 소비자가 `skipLibCheck`를 켜면 숨겨질 뿐 | `d.ts`가 존재하지 않는 `./styles.css`를 참조(dist에는 `style.css`만 있음). TS 6 기본값에서 타입 검사 환경에 따라 오류 | 진입점에서 CSS import 제거(소비 앱이 `styles.css`를 명시 import하므로 JS도 어차피 CSS를 포함하지 않음), 또는 d.ts 후처리로 제거. 추가로 `@dev.leejinw/ui/styles.css`용 `*.css` 선언을 README에 안내 |
| F-03 | Major | `packages/ui/package.json`, 저장소 루트 | `pnpm pack` 내용물 확인 | `license` 필드와 `LICENSE` 파일 없음. tarball에 `OFL.txt`(폰트)만 있음 | 공개 게시 시 재사용 조건 불명. 폰트 OFL 고지는 있으나 패키지 자체 라이선스가 없음 | 라이선스 결정(MIT 등) 후 `license` 필드, `LICENSE`, `files` 반영. `description`·`keywords`·`sideEffects`(`["**/*.css"]`)·`publishConfig.access: public`도 함께 정리 |
| F-04 | Major | `TextField.tsx:32-33`, `Textarea.tsx:34-35`, `Checkbox.tsx:48-49` | `<TextField aria-invalid="true" />`처럼 `error` 없이 소비자가 직접 지정 | 최종 `aria-invalid` 속성이 사라짐(재현 확인). 요청서 6절의 "ARIA 우선순위" 항목에 해당 | 폼 라이브러리가 `aria-invalid`만 넘기는 경우 오류 상태 손실. 반대로 `error`가 있으면 소비자 값이 덮임 | `aria-invalid={Boolean(error) || ariaInvalid || undefined}`처럼 소비자 값 병합 정책을 명시하고 문서화 |
| F-05 | Minor | `Checkbox.tsx:33-37` | 인라인 `handleRef` 사용, 렌더마다 새 함수 | 전달 ref 콜백이 `el, null, el` 순서로 매 렌더 재호출됨(재현 확인). 객체 ref는 정상 | 소비자 ref 콜백에 부수효과가 있으면 불필요한 해제·재설정. 내부 `useRef`와 이중 관리 | `useCallback`으로 안정화하거나 `indeterminate`를 `ref` 콜백에서 직접 설정해 `useEffect`/내부 ref 제거 |
| F-06 | Minor | `TextField.tsx:36`, `FieldMessage.tsx:13-14` | `error` prop이 제출 후 나타나는 경우 | 오류 문구에 `role="alert"`/`aria-live` 없음(재현 확인). 포커스 이동 없이 오류가 생기면 공지되지 않음 | 요청서가 소비 앱 책임 경계를 검토하라고 명시한 부분. 현재 계약이 문서에 없음 | 기본값은 유지(폼 단위 공지가 소비 앱 책임)하되 README에 "오류 공지·포커스 이동은 소비 앱 책임" 명시. 필요 시 `errorRole` 옵션은 후속 |
| F-07 | Minor | `README.md:51`, `PRD.md:107` | 문서 대조 | README 51행에 과거 scope `@leejinw` 남음(요청서가 알린 항목). PRD 107행도 저장소를 `dlwlsdn201/leejinw-design-system`으로 기술(`origin/main`의 `2381598`에서 일부만 갱신됨) | 새 소비자가 잘못된 scope 권한을 확인할 수 있음 | 로컬을 `origin/main`에 맞춘 뒤 README 51행을 `@dev.leejinw`로 수정, PRD 107행 저장소명 재확인. 루트 `README.md:5` 링크도 같은 방식으로 확인 |
| F-08 | Minor | `validate-tokens.mjs:17`, `build-tokens.mjs:19` | 토큰 `hex`와 `components`를 다르게 수정 | 생성기는 `hex`만 사용하고 검증기도 `hex`만 읽음. `components` 불일치와 `hex` 형식 오류, 존재하지 않는 참조(`var()` 대상 누락), 비색상 타입 참조는 검증되지 않음(스크립트 읽기 기반, 별도 재현 안 함) | 요청서 5절 질문에 대한 답: 불일치는 감지되지 않음. Figma 변수가 `components`를 쓰면 코드와 어긋날 수 있음 | `components`↔`hex` 일치 검사, 모든 `{ref}` 존재 확인, 대비 쌍에 사용 중인 조합(예: `badge-neutral` 등) 보강. `pnpm tokens` 후 `git diff --exit-code src/tokens.css`를 CI에 추가해 생성물 동기 확인 |
| F-09 | Minor | `ui.module.css` `.button`(`white-space: nowrap`), `.input`(44px 고정) | **가설(브라우저 미검증)**: 320px 폭에서 긴 한영 라벨 | nowrap + `max-width:100%`라 긴 라벨이 잘리거나 넘칠 가능성. 입력 `min-height:44px`와 `Button md` 40px(fine pointer) 높이 불일치 | 요청서의 긴 번역 문자열·리플로 항목. 같은 줄에 두면 높이가 어긋남 | 브라우저 확인 후 `white-space: normal` 허용 여부 결정. 입력 높이 토큰을 `control-md`로 맞출지 Figma와 대조 |
| F-10 | Minor | `Link.tsx:32`, `Button.tsx:33-35` | 외부 링크 / 아이콘 전용 버튼 | `↗`는 `aria-hidden`이라 "새 창" 안내가 보조기술에 전달되지 않음. 아이콘 전용 `Button`은 빈 이름 가능(`aria-label` 책임 미문서화, 재현 확인) | WCAG 2.4.4/4.1.2 관련 문서 공백 | README에 "아이콘만 쓸 때 `aria-label` 필수", "외부 링크 안내는 `aria-label` 또는 시각 숨김 텍스트로 소비 앱이 제공"을 명시 |
| F-11 | 제안 | `src/components/*.test.tsx` | 테스트 4파일 5건 | Textarea, Badge 테스트 없음. F-01·F-04·F-05의 회귀 테스트 없음 | 이미 발견된 결함이 재발할 때 잡히지 않음 | 위 결함 수정 시 동작 테스트만 추가(F-01 클릭 후 상태, F-04 `aria-invalid` 병합, Textarea 설명 연결). 테스트 수를 늘리는 것이 목적은 아님 |
| F-12 | 제안 | `ui.module.css` `.checkbox`, `.input:disabled` | 코드 읽기 | 체크박스 disabled 시각 처리 없음(브라우저 기본값 의존), 포커스 링 외 `forced-colors` 처리 없음 | 낮음. 네이티브 렌더링이라 대체로 안전 | 브라우저 QA 뒤 필요할 때만 추가 |

### 확인했으나 문제 없던 항목

- `Button`: 기본 `type="button"`, `type="submit"` 폼 제출, 로딩 시 disabled·aria-busy·이름 유지, ref 전달(React 19 `ComponentPropsWithRef`).
- `Link`: 기존 `rel`과 `noopener noreferrer` 병합·중복 제거, `target="_blank"` 단독 지정도 처리(`rel="author noopener noreferrer"` 확인). `isExternal`이 `target="_self"`를 덮어쓰는 것은 의도된 동작으로 보임.
- `TextField`: ref, `style`(input에 적용), `className`(wrapper에 적용), `required`의 `aria-hidden` 별표, label 접근성 이름("x") 정상. 외부 `aria-describedby` 병합(`ext _r_3_-hint`) 정상.
- `Textarea`: 힌트·오류가 접근성 설명에 연결됨.
- SSR: `renderToString`이 정상 동작하며 ID가 서버/클라이언트에서 일관됨(`useId`).
- 번들: React·JSX runtime은 external이고 `"use client"` 배너가 `dist/index.js`에 유지됨.

## 4. 정책 결정이 필요한 항목

| 항목 | 대안 | 추천 |
| --- | --- | --- |
| `"use client"` 범위 | (a) 현재처럼 진입점 전체 (b) 컴포넌트별 분리 | **(a) 유지.** Checkbox만 훅을 쓰고 나머지는 서버 컴포넌트로 가능하지만, 6개 규모에서 번들 분리 비용이 이득보다 큼. Vite 경고(`MODULE_LEVEL_DIRECTIVE`)는 문서 앱 번들링 경고이고 Next 빌드는 성공 |
| 라이선스 | MIT / 비공개 유지 | 공개 의도면 MIT. 폰트는 OFL 유지 |
| 폰트 크기 단위 | px 유지 / rem 전환 | 브라우저 확대는 px도 정상 동작. 글꼴 크기 설정 존중이 중요하면 후속 다크 모드 때 rem 전환 검토. 지금 바꾸지 않음 |
| 오류 공지 | 소비 앱 책임 유지 / `role="alert"` 내장 | **소비 앱 책임 유지**(요청서의 합의 방향과 일치). 문서화만 보강 |

## 5. 검증 증거

| 명령 / 항목 | 결과 |
| --- | --- |
| `pnpm install --frozen-lockfile` | 성공. `esbuild` 빌드 스크립트 무시 경고(`pnpm approve-builds`) 출력 |
| `pnpm typecheck` | 성공 (UI·docs·next-smoke) |
| `pnpm lint` | 성공 |
| `pnpm test` | 대비 10쌍 통과, Vitest 4파일 5테스트 통과 |
| `pnpm build` | 성공. 토큰 72개 생성, Next 정적 페이지 3개 생성. `use client` 지시자 경고 1건 |
| `pnpm storybook:build` | 성공. 500 kB 초과 chunk 경고와 `use client` 경고 |
| 생성물 동기 | 위 명령 실행 후에도 `git status`가 깨끗해 `src/tokens.css`는 JSON과 일치 |
| `pnpm pack` | tarball에 `dist/**`, `tokens/tokens.json`, `README.md`, `package.json` 포함. 폰트·OFL 포함. `LICENSE` 없음 |
| 별도 소비 프로젝트(workspace 밖, React 19.3.1) | 설치 성공, React 단일 인스턴스, `renderToString` 성공. `tsc --strict --skipLibCheck false`에서 F-02 재현. `@dev.leejinw/ui/styles.css` import는 별도 CSS 선언이 없는 순수 TS 환경에서 TS2882 (Vite/Next 환경에서는 각 타입 선언이 해결) |
| 임시 행동 테스트 | F-01, F-04, F-05, F-06, F-10 재현. 파일 삭제 후 소스 변경 없음 확인 |
| **미실행 / 접근 불가** | 브라우저 수동 QA 전 항목, Figma 변수·바인딩·variant 대조, 폰트 대체(Noto Sans KR) 차이 평가, 사용자 시각 승인, GitHub Actions(저장소에 `.github` 없음) |

참고 사양(확인일 2026-10-18): ARIA in HTML — `input type=checkbox`에는 `aria-checked` 사용 금지(<https://www.w3.org/TR/html-aria/>), WCAG 2.2 (<https://www.w3.org/TR/WCAG22/>). 이 보고서에서 별도 웹 재조회는 하지 않았고 위 두 항목은 기존 지식 기준이므로, 수정 전에 원문을 한 번 확인하는 것을 권한다.

## 6. 남은 작업

**출시 전 필수**
1. F-01 Checkbox `aria-checked` 제거와 테스트 교체
2. F-02 배포 `d.ts`의 `./styles.css` import 제거 후 압축물 `tsc` 재검증
3. F-03 라이선스·패키지 메타데이터 확정
4. F-04 `aria-invalid` 병합 정책
5. F-07 문서의 과거 scope·저장소명 정리(로컬을 `origin/main`에 맞춘 뒤)
6. 브라우저 수동 QA(요청서 9절 체크리스트) 수행, F-09 가설 확인
7. GitHub Actions: `pnpm install --frozen-lockfile` → `typecheck` → `lint` → `test` → `build`, 토큰 생성 후 `git diff --exit-code`, 압축물 소비 검증

**후속 개선**
- F-05, F-06, F-08, F-10 및 F-11 테스트 보강
- 다크 모드 전 토큰 override 방식(`:root` 전역 노출 → 테마 속성 기반) 설계
- Next 검증 앱에 Link·Textarea·Checkbox 소비 예제 추가(현재 3개만 소비)

**사용자 확인**
- Figma 시각 방향 최종 승인, Pretendard 환경에서 Figma 재대조
