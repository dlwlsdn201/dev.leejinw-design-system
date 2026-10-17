import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@leejinw/ui';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: '변경 사항 저장', variant: 'primary', size: 'md' },
  parameters: { docs: { description: { component: '동작을 실행합니다. 한 화면에서 가장 중요한 동작에만 primary를 사용합니다. / Triggers an action; reserve primary for the main action.' } } },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: '취소 / Cancel' } };
export const Ghost: Story = { args: { variant: 'ghost', children: '자세히 보기 / Learn more' } };
export const Loading: Story = { args: { isLoading: true, children: '저장 중 / Saving' } };
export const Disabled: Story = { args: { disabled: true } };
