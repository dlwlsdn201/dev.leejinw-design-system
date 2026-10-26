import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/Toast', component: ToastExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof ToastExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
