import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonExample } from '../examples/ExpansionExamples';

const meta = { title: 'Components/Skeleton', component: SkeletonExample, tags: ['autodocs'], args: { language: 'ko' }, argTypes: { language: { control: 'select', options: ['ko', 'en'] } } } satisfies Meta<typeof SkeletonExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Korean: Story = {};
export const English: Story = { args: { language: 'en' } };
