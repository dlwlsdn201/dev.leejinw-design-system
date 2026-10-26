import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownMenuExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/DropdownMenu', component: DropdownMenuExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof DropdownMenuExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
