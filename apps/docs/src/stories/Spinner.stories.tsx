import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '@dev.leejinw/ui';
import { SpinnerExample } from '../examples/ExpansionExamples';

const meta = {
  title: 'Components/Spinner', component: Spinner, tags: ['autodocs'],
  args: { label: '불러오는 중', variant: 'ring' },
  argTypes: { variant: { control: 'select', options: ['ring', 'dots', 'bars'] } },
} satisfies Meta<typeof Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Ring: Story = {};
export const Dots: Story = { args: { variant: 'dots' } };
export const Bars: Story = { args: { variant: 'bars' } };
export const Korean: Story = { render: () => <SpinnerExample language="ko" /> };
export const English: Story = { render: () => <SpinnerExample language="en" /> };
