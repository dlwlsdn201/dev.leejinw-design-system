import { Badge, Button, TextField } from '@dev.leejinw/ui';

/** Renders package components inside the Next.js App Router. */
const HomePage = () => (
  <main style={{ padding: 32, display: 'grid', gap: 20, maxWidth: 440 }}>
    <h1>Design system integration</h1>
    <Badge tone="accent">Next.js</Badge>
    <TextField label="프로젝트 이름 / Project name" placeholder="Quiet Precision" />
    <Button>저장 / Save</Button>
  </main>
);

export default HomePage;
