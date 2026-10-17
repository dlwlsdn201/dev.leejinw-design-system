import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@leejinw/ui';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: '초안 / Draft' },
  parameters: { docs: { description: { component: '짧은 분류나 상태를 표시합니다. 상호작용 요소가 아닙니다. / Displays a short, non-interactive status.' } } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Accent: Story = { args: { tone: 'accent', children: '진행 중 / In progress' } };
export const Error: Story = { args: { tone: 'error', children: '오류 / Error' } };
