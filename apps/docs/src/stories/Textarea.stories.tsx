import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '@dev.leejinw/ui';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: '프로젝트 설명 / Project description', placeholder: '설명을 입력하세요 / Describe your project' },
  parameters: { docs: { description: { component: '긴 내용을 입력받습니다. 높이를 조절할 수 있습니다. / Collects longer input and remains resizable.' } } },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: '핵심만 간결하게 작성하세요. / Keep it concise.' } };
export const Error: Story = { args: { error: '설명을 입력하세요. / Add a description.' } };
