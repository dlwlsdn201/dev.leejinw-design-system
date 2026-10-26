import { Badge, Button, Dialog, DialogClose, DialogContent, DialogTrigger, Select, Switch, TextField } from '@dev.leejinw/ui';

/** Renders package components inside the Next.js App Router. */
const HomePage = () => (
  <main style={{ padding: 32, display: 'grid', gap: 20, maxWidth: 440 }}>
    <h1>Design system integration</h1>
    <Badge tone="accent">Next.js</Badge>
    <TextField label="프로젝트 이름 / Project name" placeholder="Quiet Precision" />
    <Button>저장 / Save</Button>
    <Select label="정렬 / Sort" defaultValue="recent" options={[{ value: 'recent', label: '최신순 / Newest' }, { value: 'name', label: '이름순 / Name' }]} />
    <Switch label="자동 저장 / Autosave" defaultChecked />
    <Dialog>
      <DialogTrigger asChild><Button variant="secondary">편집 / Edit</Button></DialogTrigger>
      <DialogContent title="프로젝트 편집 / Edit project" description="Next.js App Router에서 열린 모달입니다." closeLabel="닫기 / Close">
        <TextField label="프로젝트 이름 / Project name" defaultValue="Quiet Precision" />
        <DialogClose asChild><Button>확인 / Done</Button></DialogClose>
      </DialogContent>
    </Dialog>
  </main>
);

export default HomePage;
