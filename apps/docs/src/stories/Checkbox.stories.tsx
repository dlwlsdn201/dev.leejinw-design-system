import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@leejinw/ui';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: '업데이트 소식 받기 / Receive updates' },
  parameters: { docs: { description: { component: '독립적인 선택을 표현합니다. / Represents an independent choice.' } } },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Mixed: Story = { args: { isIndeterminate: true, label: '전체 선택 / Select all' } };
export const Error: Story = { args: { error: '동의가 필요합니다. / Consent is required.' } };
