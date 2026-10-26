import type { Meta, StoryObj } from '@storybook/react-vite';
import { AlertExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/Alert', component: AlertExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof AlertExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
