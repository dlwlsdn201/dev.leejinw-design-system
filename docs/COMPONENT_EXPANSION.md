# 1차 컴포넌트 확장

작성일: 2026-10-26. 기존 6종을 유지하고 13종을 추가해 총 19종을 제공한다. 라이트 모드만 대상이다.

## 범위와 구현

| 컴포넌트 | 공개 계약과 검토 상태 |
| --- | --- |
| Select | 문자열 value/onValueChange, options, label/hint/error, required/name/form, disabled. 검색·다중 선택은 제외 |
| RadioGroup | 네이티브 fieldset/legend/radio. label/options, value 또는 defaultValue, onValueChange, name/form/required/disabled |
| Switch | Radix Root/Thumb. label/hint, checked/defaultChecked/onCheckedChange, disabled/name/form |
| Dialog | Root·Trigger·Content·Close. Content에 title/description/closeLabel 필수. 포커스 가두기·Escape·포커스 복원 |
| AlertDialog | Root·Trigger·Content·Cancel·Action. title/description 필수. 기본 포커스는 Cancel. 실패 시 이벤트 취소 또는 controlled open으로 유지 |
| DropdownMenu | Root·Trigger·Content·Item. onSelect/disabled, danger tone. 선택 값을 입력하는 Select와 구분 |
| Popover | Root·Trigger·Content·Close. Content에 title/closeLabel 필수. 비모달 맥락 패널 |
| Tooltip | 하나의 포커스 가능한 ReactElement + content. 보조 설명 전용, 필수 정보·인터랙티브 콘텐츠 금지 |
| Tabs | Root·List·Trigger·Content. matching value, disabled, keyboard navigation. List에 접근 가능한 이름 제공 |
| Alert | info/error. info는 status, error는 alert가 기본이며 role 재정의 가능 |
| Toast | Provider·Toast·Viewport. title/description/closeLabel, open/onOpenChange, duration/type. 앱당 Viewport 1개 |
| Skeleton | aria-hidden 장식. 상위 영역에 aria-busy와 보이는 로딩 안내 제공 |
| Spinner | 소비 앱이 label 제공. role=status, 모션을 줄여도 문구 유지 |

Select·Switch·오버레이·Tabs·Toast는 `radix-ui@1.8.1`을 사용한다. RadioGroup은 방향키 입력의 비동기 선택 갱신 문제를 검증한 후 네이티브 입력을 사용하도록 결정했다. 앱의 라우터·폼 라이브러리·번역·비즈니스 상태를 패키지에 넣지 않는다.

## 사용 예시

```tsx
import {
  Button, Dialog, DialogTrigger, DialogContent, DialogClose, Select,
} from '@dev.leejinw/ui';
import '@dev.leejinw/ui/styles.css';
import '@dev.leejinw/ui/fonts.css';

<Select
  label="프로젝트 정렬"
  defaultValue="recent"
  options={[
    { value: 'recent', label: '최신순' },
    { value: 'name', label: '이름순' },
  ]}
  onValueChange={setSort}
/>

<Dialog>
  <DialogTrigger asChild><Button>프로젝트 편집</Button></DialogTrigger>
  <DialogContent title="프로젝트 편집" description="변경할 내용을 입력하세요." closeLabel="닫기">
    {/* 입력 필드와 앱의 제출 로직 */}
    <DialogClose asChild><Button variant="secondary">취소</Button></DialogClose>
  </DialogContent>
</Dialog>
```

- Trigger/Close/Action/Cancel을 Button과 조합할 때 `asChild`를 사용한다. 버튼을 중첩하지 않는다.
- Select option.value는 비어 있지 않은 고유 문자열이어야 한다. 빈 문자열은 선택 해제/placeholder 표시용이다.
- Select의 className은 필드 외곽, ref는 Trigger에 전달한다. RadioGroup ref는 fieldset에 전달한다.
- Dialog·AlertDialog의 비동기 저장/삭제는 소비 앱에서 처리한다. 실패 가능 작업을 자동 닫힘 Action으로 감싸지 말고 controlled open으로 성공 시 닫거나, Action의 이벤트에서 preventDefault 후 실행한다. 실패 시 오류 메시지를 표시한다.
- Toast는 Provider와 Viewport가 필요하다. Provider의 label 및 Viewport의 label을 번역한다. 기본 자동 닫힘은 5초이며 오류·중요 안내에는 충분한 duration 또는 지속적인 Alert를 선택한다. Toast에 필수 조치나 오류 내용을 유일하게 남기지 않는다.
- Tooltip은 포인터 호버와 키보드 포커스에 대응한다. 이름을 숨기거나 disabled 버튼에만 설명을 연결하지 않는다.

완전한 동작 예시: `apps/docs/src/examples/ExpansionExamples.tsx`. 각 컴포넌트의 Storybook에는 KO/EN 예시가 있다.

## 토큰·패키지 계약

- 추가 8개: size.dialog=480px, size.popover=320px, size.menuMin=192px, opacity.overlay=0.4, zIndex.overlay=100/floating=110/toast=120/tooltip=130.
- JSON이 원본이며 `pnpm tokens`로 CSS를 생성한다. 토큰은 총 80개다.
- Radix는 패키지 dependencies에 명시하고 번들에서 external로 둔다. React/ReactDOM peerDependencies는 유지한다.
- `sideEffects: ['**/*.css']`로 CSS 보존을 명시했다. Vite가 styles.css를 style.css로 추출하므로 선언 파일의 CSS 경로도 산출물에 맞춘다.
- 패키지 버전 0.1.0/private 설정은 유지한다. npm 배포 준비 전체 완료를 의미하지 않는다.

## Figma

파일: https://www.figma.com/design/ifKbIexGO4cYM07mjr15wA?node-id=57-57

기존 `01 Components` 페이지 아래 `Components / Expansion / Light`에 상태별 연결 인스턴스를 배치한다. 원본은 x=3300에 분리한다. 기존 컴포넌트와 승인된 표본은 보존한다.

| 컴포넌트 | Component set | 상태 |
| --- | --- | --- |
| Select | 57:93 | Default / Focus / Error / Disabled / Open |
| RadioGroup | 57:164 | Default / Disabled |
| Switch | 57:215 | Off / On / DisabledOff / DisabledOn |
| Dialog | 57:262 | Open |
| AlertDialog | 57:300 | Confirm / Error |
| DropdownMenu | 57:334 | Open, 메뉴 내 disabled/danger 항목 |
| Popover | 57:352 | Open |
| Tooltip | 57:365 | Visible |
| Tabs | 57:392 | Overview / Activity, disabled 탭 포함 |
| Alert | 57:425 | Info / Error |
| Toast | 57:448 | Info / Error |
| Skeleton | 57:470 | Loading |
| Spinner | 57:487 | Loading |

Figma는 13개 세트·25개 variant를 추가한다. Label 또는 상태별 Title 속성을 노출하며 기존 변수·Preview 텍스트 스타일에 연결한다. 렌더러에서 Pretendard가 제공되지 않아 기존 Noto Sans KR Preview 스타일을 사용한다. 코드 폰트는 Pretendard이며 픽셀 수준의 글꼴 일치로 간주하지 않는다. Figma는 상태의 시각 비교용이며 작동하는 프로토타입 연결은 제공하지 않는다. 동작 검증은 코드 카탈로그·Storybook에서 한다.

## 확인 범위

- 타입·린트·유닛/RTL, 전체 UI·카탈로그·Next.js 빌드, Storybook 빌드.
- 실제 Chrome: KO/EN, 320/1440px, Select 선택, 네이티브 라디오 방향키, Switch 클릭, Dialog 포커스 가두기/Escape/복원, AlertDialog 실패 시 유지, 메뉴 disabled·선택, Popover·Tooltip 열기/닫기, Tabs 방향키, Toast 닫기.
- 별도 임시 소비 프로젝트에 tarball을 설치해 strict TypeScript와 Vite 번들 검증.
- 기존 교차 검토 문서는 당시 기록으로 유지한다. CSS 선언 경로·메타데이터를 보완했어도 기존 컴포넌트의 ref/ARIA와 토큰 검증기 등 다른 미해결 지적을 모두 해결한 것은 아니다.
- 실제 보조공학 음성 출력, Safari/Firefox, 실제 모바일 기기, 다크 모드는 이번 검증 범위 밖이다.

### Figma 검증 기록

- 새 검토 영역의 컨테이너 138개에 대해 자식 넘침·수직 겹침 0건을 확인했다.
- 전체 프레임 및 Select·Switch·Dialog·AlertDialog·DropdownMenu·RadioGroup·Popover·Tooltip·Toast의 개별 이미지를 확인했다.
- Tabs·Alert·Skeleton·Spinner는 전체 프레임 이미지와 구조 검사로 확인했다. 마지막 개별 확대 이미지 요청은 Figma Starter MCP 호출 한도에 도달해 가져오지 못했다. 개별 확대 최종 검토는 남아 있다.
- Figma 글꼴 차이와 위 이미지 조회 제한은 코드 브라우저 검증의 통과 여부와 구분한다.

## Spinner 디자인 확장 (2026-10-29)

`variant?: 'ring' | 'dots' | 'bars'`를 지원한다. 기본은 기존 ring이다. variant를 생략한 기존 사용 코드도 유지된다.

```tsx
<Spinner label="불러오는 중" />
<Spinner variant="dots" label="응답 대기 중" />
<Spinner variant="bars" label="처리 중" />
```

세 유형 모두 currentColor를 사용하며 텍스트와 아이콘이 한 개의 status를 구성한다. 기하학적 표시는 aria-hidden이다. 점은 최대 2px만 움직이고 막대는 제자리에서 높이만 변화한다. ring은 기존 회전 주기 0.7초, dots/bars는 기존 duration.spinner 토큰의 두 배(1.4초) 주기를 사용한다. 점/막대의 위상은 해당 토큰으로 계산한다. reduced-motion에서는 모든 움직임을 멈추고 로딩 문구를 유지한다. 실제 진행률을 나타내는 컴포넌트는 아니다.

Figma의 기존 Spinner 세트 `57:487`에 Variant 축을 추가했다. Ring `57:482`의 ID는 유지하고 Dots `73:213`, Bars `73:223`을 추가해 전체 variant는 27개다. 검토 카드 `57:488`에서 세 유형을 비교할 수 있다. 정적 대표 프레임이며 실제 모션은 카탈로그와 Storybook에서 검토한다. 2026-10-29 Spinner의 개별 확대 이미지·셋 소유권·variant 옵션·잘림 검토를 완료했다. 이전 단계의 Tabs·Alert·Skeleton 개별 확대 검토는 별도로 남아 있다.

검증: 타입·린트·13개 기존 동작 테스트·전체 빌드·Storybook 빌드 통과. Chrome KO/EN × 320/768/1440px에서 세 유형의 실제 움직임·가로 넘침 없음·상태 문구를 확인하고, reduced-motion에서 모든 유형이 정지함을 확인했다.

모션 감소 처리 참고: [W3C prefers-reduced-motion 기법 C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) (확인일: 2026-10-29).
