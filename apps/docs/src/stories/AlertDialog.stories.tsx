import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertDialogExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/AlertDialog', component: AlertDialogExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof AlertDialogExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
