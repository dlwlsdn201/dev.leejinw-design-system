import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroupExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/RadioGroup', component: RadioGroupExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof RadioGroupExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
