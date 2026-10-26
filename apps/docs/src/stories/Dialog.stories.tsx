import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/Dialog', component: DialogExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof DialogExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
