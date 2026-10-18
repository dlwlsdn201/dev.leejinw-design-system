import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from '@dev.leejinw/ui';

const meta = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  args: { href: '#', children: '사용 가이드 / Usage guide' },
  parameters: { docs: { description: { component: '다른 위치로 이동합니다. 동작 실행에는 Button을 사용합니다. / Navigates to another location.' } } },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Accent: Story = { args: { variant: 'accent' } };
export const External: Story = { args: { href: 'https://www.w3.org/WAI/ARIA/apg/', isExternal: true, children: '접근성 지침 / Accessibility guide' } };
