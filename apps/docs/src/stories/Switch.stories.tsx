import type { Meta, StoryObj } from '@storybook/react-vite';
import { SwitchExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/Switch', component: SwitchExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof SwitchExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
