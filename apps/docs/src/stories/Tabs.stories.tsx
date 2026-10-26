import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabsExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/Tabs', component: TabsExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof TabsExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
