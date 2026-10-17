# @leejinw/ui

React 19용 기본 UI 컴포넌트입니다. 앱의 라우터, 폼 라이브러리, 상태 관리에 의존하지 않습니다.

```tsx
import '@leejinw/ui/styles.css';
import '@leejinw/ui/fonts.css';
import { Button, TextField } from '@leejinw/ui';

export const Example = () => (
  <form>
    <TextField label="프로젝트 이름" name="projectName" required />
    <Button type="submit">저장</Button>
  </form>
);
```

`styles.css`는 토큰과 컴포넌트 스타일을 포함합니다. `fonts.css`는 별도 Pretendard 파일을 참조하므로 필요할 때만 가져옵니다. 앱의 i18n 라이브러리와 번역 리소스는 소비 앱이 소유합니다.

| 컴포넌트 | 목적 | 주의 |
| --- | --- | --- |
| Button | 동작 실행 | 이동에는 Link 사용. 로딩 중 중복 동작 방지 |
| Link | 이동 | 새 창은 `isExternal`로 표시 |
| TextField | 짧은 입력 | 보이는 label 필수, hint/error 연결 |
| Textarea | 긴 입력 | 세로 크기 조절 가능 |
| Checkbox | 독립 선택 | mixed 상태 지원 |
| Badge | 짧은 상태 | 상호작용 요소로 쓰지 않음 |

키보드 포커스는 `:focus-visible` 외곽선으로 표시합니다. `aria-describedby`, `aria-invalid`, `aria-busy` 등 상태 속성은 컴포넌트가 제공합니다. 실제 문구와 검증 규칙은 소비 앱이 결정합니다.
