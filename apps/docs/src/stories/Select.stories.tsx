import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/Select', component: SelectExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof SelectExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
