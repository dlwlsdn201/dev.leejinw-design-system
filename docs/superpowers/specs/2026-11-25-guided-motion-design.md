# Guided motion

사용자가 motion-directions.html의 B · Guided를 선택했다.

- 기존 duration.fast(150ms), duration.normal(200ms), space.micro(2px), space.1(4px) 사용.
- Button hover 2px 상승, Select chevron 180도 회전, 상태 색 전환.
- Select/Menu/Popover/Tooltip/Dialog/Toast의 등장·퇴장에 opacity와 4px 이동 사용. Dialog의 중앙 배치 transform은 유지하고 translate 속성을 별도로 사용한다.
- Switch 색과 thumb, Tabs 상태·패널 전환, 입력 테두리와 Link 색 전환.
- Badge/Alert/Skeleton에는 자동 반복·장식 모션을 추가하지 않는다. 네이티브 Checkbox/Radio의 접근성·표시는 유지한다.
- reduced-motion에서 새 transition/animation과 hover 이동 제거. Toast 스와이프 transform 유지.
- CSS 변경만으로 공개 API를 유지한다. 토큰 값 변경·의존성 추가·커밋 없음.

## Radio / Checkbox / focus 보완

후속 요청에 따라 native input의 동작은 유지하고 appearance만 CSS로 지정한다. Checkbox는 체크/혼합 표시, Radio는 중앙 점을 200ms scale + 150ms opacity로 전환한다. 포커스는 기존 focusIndicator 토큰의 흰색 간격과 고대비 링, space.2 너비의 accentSubtle halo를 사용한다. forced-colors에서는 native appearance와 Highlight outline으로 복원하고 reduced-motion에서는 전환을 제거한다.

검증: typecheck, lint, test(13개), build, storybook:build 통과. Chrome에서 checked/indeterminate 표시, Radio 점, focus halo, forced-colors native 복원 및 reduced-motion 0s를 확인했다. CSS 시각 변경이므로 스타일/스냅샷 테스트는 추가하지 않았다.

### 공통 포커스 shadow 조정

후속 요청에 따라 선명한 다중 링을 blur가 있는 2겹 shadow로 교체했다. 안쪽은 focus.ring 색과 space.1 blur, stroke.default spread, 바깥쪽은 surface.accentSubtle 색과 space.3 blur, focusIndicator.width spread를 사용한다. 고대비 모드의 Highlight outline은 유지한다.

### 포커스 fade 보완

focus.ring 색을 opacity.disabled 비율로 투명색과 혼합하고 blur를 space.2/space.4로 넓혔다. 기본 상태에도 같은 크기의 투명 shadow를 지정하고 box-shadow 150ms 전환을 적용해 focus-in/out 모두 페이드한다. reduced-motion에서 즉시 전환하며 forced-colors의 outline을 유지한다.

## Link · A / Flow

사용자가 A 시안을 선택했다. 기본 underline을 유지하면서 hover와 focus-visible에서 currentColor 밑줄이 왼쪽에서 들어오고 오른쪽으로 빠진다. duration.normal과 stroke.strong 토큰을 사용하고, inline 여러 줄은 box-decoration-break: clone으로 표시한다. reduced-motion에서는 즉시 변경된다. 공개 API와 외부 링크 보안 속성은 유지한다.
