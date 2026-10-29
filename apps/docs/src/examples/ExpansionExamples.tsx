import { useState } from 'react';
import type { SpinnerVariant } from '@dev.leejinw/ui';
import {
  Alert, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger,
  Button, Dialog, DialogClose, DialogContent, DialogTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  Popover, PopoverContent, PopoverTrigger, RadioGroup, Select, Skeleton, Spinner, Switch,
  Tabs, TabsContent, TabsList, TabsTrigger, TextField, Toast, ToastProvider, ToastViewport, Tooltip,
} from '@dev.leejinw/ui';

type ExampleProps = { language?: 'ko' | 'en' };
const text = (language: ExampleProps['language'], ko: string, en: string) => language === 'en' ? en : ko;

/** Demonstrates selectable values, validation, and unavailable options. */
export const SelectExample = ({ language = 'ko' }: ExampleProps) => {
  const options = [{ value: 'recent', label: text(language, '최신순', 'Newest first') }, { value: 'name', label: text(language, '이름순', 'By name') }, { value: 'popular', label: text(language, '인기순 (준비 중)', 'Popular (unavailable)'), disabled: true }];
  return <div className="form-stack"><Select label={text(language, '프로젝트 정렬', 'Sort projects')} defaultValue="recent" options={options} /><Select label={text(language, '필수 선택', 'Required choice')} placeholder={text(language, '정렬을 선택하세요', 'Choose a sort order')} options={options} error={text(language, '정렬을 선택해 주세요.', 'Select a sort order.')} required /><Select label={text(language, '사용 불가', 'Unavailable')} defaultValue="recent" options={options} disabled /></div>;
};

/** Demonstrates mutually exclusive choices and disabled items. */
export const RadioGroupExample = ({ language = 'ko' }: ExampleProps) => <RadioGroup label={text(language, '프로젝트 공개 범위', 'Project visibility')} defaultValue="public" options={[{ value: 'public', label: text(language, '공개', 'Public') }, { value: 'private', label: text(language, '비공개', 'Private') }, { value: 'team', label: text(language, '팀 전용 (준비 중)', 'Team only (unavailable)'), disabled: true }]} />;

/** Demonstrates editable and unavailable settings. */
export const SwitchExample = ({ language = 'ko' }: ExampleProps) => <div className="form-stack"><Switch label={text(language, '이메일 알림', 'Email notifications')} hint={text(language, '작업 완료 소식을 받습니다.', 'Receive completion updates.')} /><Switch label={text(language, '자동 저장', 'Autosave')} defaultChecked /><Switch label={text(language, '팀 알림 (준비 중)', 'Team notifications (unavailable)')} disabled /></div>;

/** Demonstrates a modal, labeled field, dismissal, and focus restoration. */
export const DialogExample = ({ language = 'ko' }: ExampleProps) => <Dialog><DialogTrigger asChild><Button variant="secondary">{text(language, '프로젝트 편집', 'Edit project')}</Button></DialogTrigger><DialogContent title={text(language, '프로젝트 편집', 'Edit project')} description={text(language, '프로젝트 이름을 변경하는 예시입니다.', 'Example of editing a project name.')} closeLabel={text(language, '닫기', 'Close')}><TextField label={text(language, '프로젝트 이름', 'Project name')} defaultValue="Quiet Precision" /><div className="example-row"><DialogClose asChild><Button variant="secondary">{text(language, '취소', 'Cancel')}</Button></DialogClose><DialogClose asChild><Button>{text(language, '확인', 'Done')}</Button></DialogClose></div></DialogContent></Dialog>;

/** Demonstrates confirmation and preserving the modal when an operation fails. */
export const AlertDialogExample = ({ language = 'ko' }: ExampleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldFail, setShouldFail] = useState(false);
  const [hasError, setHasError] = useState(false);
  return <AlertDialog open={isOpen} onOpenChange={open => { setIsOpen(open); if (open) setHasError(false); }}><AlertDialogTrigger asChild><Button variant="secondary">{text(language, '삭제 확인 예시', 'Deletion confirmation')}</Button></AlertDialogTrigger><AlertDialogContent title={text(language, '프로젝트를 삭제할까요?', 'Delete this project?')} description={text(language, '동작 확인용 예시이며 실제 데이터는 삭제하지 않습니다.', 'This demonstration does not delete real data.')}><Switch label={text(language, '실패 응답 테스트', 'Simulate a failed response')} checked={shouldFail} onCheckedChange={setShouldFail} />{hasError && <Alert tone="error" title={text(language, '삭제하지 못했습니다.', 'Deletion failed.')}>{text(language, '실패 테스트를 끄고 다시 시도하세요.', 'Turn off the failure simulation and try again.')}</Alert>}<div className="example-row"><AlertDialogCancel asChild><Button variant="secondary">{text(language, '취소', 'Cancel')}</Button></AlertDialogCancel><AlertDialogAction asChild><Button onClick={event => { if (shouldFail) { event.preventDefault(); setHasError(true); } }}>{text(language, '삭제 확인', 'Confirm deletion')}</Button></AlertDialogAction></div></AlertDialogContent></AlertDialog>;
};

/** Demonstrates an action menu, a disabled action, and selection feedback. */
export const DropdownMenuExample = ({ language = 'ko' }: ExampleProps) => {
  const [result, setResult] = useState('');
  return <><DropdownMenu><DropdownMenuTrigger asChild><Button variant="secondary">{text(language, '프로젝트 작업', 'Project actions')}</Button></DropdownMenuTrigger><DropdownMenuContent aria-label={text(language, '프로젝트 작업', 'Project actions')}><DropdownMenuItem onSelect={() => setResult(text(language, '복제 작업을 선택했습니다.', 'Duplicate selected.'))}>{text(language, '복제', 'Duplicate')}</DropdownMenuItem><DropdownMenuItem disabled>{text(language, '내보내기 (준비 중)', 'Export (unavailable)')}</DropdownMenuItem><DropdownMenuItem tone="danger" onSelect={() => setResult(text(language, '삭제 작업을 선택했습니다.', 'Delete selected.'))}>{text(language, '삭제', 'Delete')}</DropdownMenuItem></DropdownMenuContent></DropdownMenu><p role="status">{result}</p></>;
};

/** Demonstrates a contextual interactive panel. */
export const PopoverExample = ({ language = 'ko' }: ExampleProps) => <Popover><PopoverTrigger asChild><Button variant="secondary">{text(language, '표시 설정', 'Display settings')}</Button></PopoverTrigger><PopoverContent title={text(language, '표시 설정', 'Display settings')} closeLabel={text(language, '닫기', 'Close')}><Switch label={text(language, '보관된 프로젝트 표시', 'Show archived projects')} /></PopoverContent></Popover>;

/** Demonstrates a focusable trigger with a short nonessential description. */
export const TooltipExample = ({ language = 'ko' }: ExampleProps) => <Tooltip content={text(language, '프로젝트 링크를 클립보드에 복사합니다.', 'Copy the project link to your clipboard.')}><Button variant="secondary">{text(language, '공유 도움말', 'Sharing help')}</Button></Tooltip>;

/** Demonstrates linked tabs, panels, arrow keys, and an unavailable tab. */
export const TabsExample = ({ language = 'ko' }: ExampleProps) => <Tabs defaultValue="overview"><TabsList aria-label={text(language, '프로젝트 정보', 'Project information')}><TabsTrigger value="overview">{text(language, '개요', 'Overview')}</TabsTrigger><TabsTrigger value="activity">{text(language, '활동', 'Activity')}</TabsTrigger><TabsTrigger value="archive" disabled>{text(language, '보관함', 'Archive')}</TabsTrigger></TabsList><TabsContent value="overview">{text(language, '프로젝트의 목표와 주요 정보를 표시합니다.', 'Project goals and key information.')}</TabsContent><TabsContent value="activity">{text(language, '최근 변경 사항을 표시합니다.', 'Recent project changes.')}</TabsContent></Tabs>;

/** Demonstrates persistent information and actionable error guidance. */
export const AlertExample = ({ language = 'ko' }: ExampleProps) => <div className="form-stack"><Alert title={text(language, '초안으로 저장됩니다.', 'Saved as a draft.')}>{text(language, '공개하기 전까지 나에게만 보입니다.', 'Only you can see it until publication.')}</Alert><Alert tone="error" title={text(language, '저장하지 못했습니다.', 'Could not save.')}>{text(language, '연결 상태를 확인하고 다시 시도하세요.', 'Check your connection and try again.')}</Alert></div>;

/** Demonstrates consumer-owned notification state and a single notification region. */
export const ToastExample = ({ language = 'ko' }: ExampleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return <ToastProvider label={text(language, '알림', 'Notification')}><Button variant="secondary" onClick={() => setIsOpen(true)} disabled={isOpen}>{text(language, '저장 완료 알림', 'Show save notification')}</Button><Toast open={isOpen} onOpenChange={setIsOpen} title={text(language, '변경 사항을 저장했습니다.', 'Changes saved.')} description={text(language, '프로젝트에 변경 사항을 반영했습니다.', 'Your project is up to date.')} closeLabel={text(language, '알림 닫기', 'Dismiss notification')} /><ToastViewport label={text(language, '알림 영역 ({hotkey})', 'Notifications ({hotkey})')} /></ToastProvider>;
};

/** Demonstrates decorative skeletons within a named busy region. */
export const SkeletonExample = ({ language = 'ko' }: ExampleProps) => <div className="form-stack" aria-busy="true" aria-label={text(language, '프로젝트 불러오는 중', 'Loading projects')}><Skeleton /><Skeleton /><Skeleton /><span>{text(language, '프로젝트를 불러오고 있습니다.', 'Loading your projects.')}</span></div>;

const SPINNER_EXAMPLES = [
  { variant: 'ring', name: 'Ring', ko: '기본 작업 진행 · 가장 익숙한 원형', en: 'General loading · familiar circular motion' },
  { variant: 'dots', name: 'Dots', ko: '짧은 대기 · 세 점의 작은 움직임', en: 'Short waits · a subtle three-dot sequence' },
  { variant: 'bars', name: 'Bars', ko: '처리 중 · 높이만 부드럽게 변화', en: 'Processing · a gentle change in height' },
] as const satisfies readonly { variant: SpinnerVariant; name: string; ko: string; en: string }[];

/** Compares equally sized monochrome indicators with visible loading text. */
export const SpinnerExample = ({ language = 'ko' }: ExampleProps) => <div className="spinner-examples">
  {SPINNER_EXAMPLES.map(({ variant, name, ko, en }) => <div className="spinner-example" key={variant}>
    <div className="spinner-example-heading"><strong>{name}</strong>{variant === 'ring' && <span>{text(language, '기본', 'Default')}</span>}</div>
    <div className="spinner-example-preview"><Spinner variant={variant} label={text(language, '불러오는 중', 'Loading')} /></div>
    <p>{language === 'ko' ? ko : en}</p>
  </div>)}
  <p className="spinner-motion-note">{text(language, '모션 감소 설정에서는 움직임을 멈추고 로딩 문구를 유지합니다.', 'Reduced motion stops the animation while keeping the loading text visible.')}</p>
</div>;

const EXAMPLES = [
  { name: 'Select', ko: '선택 · 오류 · 사용 불가', en: 'Selection · invalid · disabled', Demo: SelectExample },
  { name: 'RadioGroup', ko: '단일 선택 · 사용 불가', en: 'Single choice · disabled', Demo: RadioGroupExample },
  { name: 'Switch', ko: '꺼짐 · 켜짐 · 사용 불가', en: 'Off · on · disabled', Demo: SwitchExample },
  { name: 'Dialog', ko: '입력 · 닫기 · 포커스 복원', en: 'Input · dismiss · restore focus', Demo: DialogExample },
  { name: 'AlertDialog', ko: '확인 · 취소 · 실패 시 유지', en: 'Confirm · cancel · keep open on failure', Demo: AlertDialogExample },
  { name: 'DropdownMenu', ko: '작업 선택 · 사용 불가', en: 'Actions · disabled', Demo: DropdownMenuExample },
  { name: 'Popover', ko: '맥락 안에서 설정 변경', en: 'Contextual settings', Demo: PopoverExample },
  { name: 'Tooltip', ko: '호버 또는 키보드 포커스로 보조 설명', en: 'Supporting text on hover or focus', Demo: TooltipExample },
  { name: 'Tabs', ko: '선택 · 키보드 탐색 · 사용 불가', en: 'Selected · keyboard navigation · disabled', Demo: TabsExample },
  { name: 'Alert', ko: '화면에 유지되는 안내 · 오류', en: 'Persistent information · error', Demo: AlertExample },
  { name: 'Toast', ko: '일시 알림 · 닫기 · 자동 닫기', en: 'Transient message · dismiss · auto-dismiss', Demo: ToastExample },
  { name: 'Skeleton', ko: '콘텐츠 로딩 · 장식 표본', en: 'Content loading · decorative geometry', Demo: SkeletonExample },
  { name: 'Spinner', ko: '단색 · 작은 움직임 · 세 가지 디자인', en: 'Monochrome · restrained motion · three variants', Demo: SpinnerExample },
] as const;

/** Shows interactive examples of the phase-one component expansion. */
export const ExpansionExamples = ({ language = 'ko' }: ExampleProps) => <>{EXAMPLES.map(({ name, ko, en, Demo }) => <article className="component-panel" key={name} id={`component-${name.toLowerCase()}`}><div className="panel-head"><h3>{name}</h3></div><p>{language === 'ko' ? ko : en}</p><Demo language={language} /></article>)}</>;
