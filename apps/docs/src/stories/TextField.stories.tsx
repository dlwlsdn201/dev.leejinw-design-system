import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from '@dev.leejinw/ui';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  args: { label: '프로젝트 이름 / Project name', placeholder: '이름을 입력하세요 / Enter a name' },
  parameters: { docs: { description: { component: '짧은 정보를 입력받습니다. 항상 보이는 label을 제공합니다. / Collects short input with a visible label.' } } },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: '사람들이 이해하기 쉬운 이름을 사용하세요. / Choose a clear name.' } };
export const Error: Story = { args: { label: '이메일 / Email', error: '올바른 주소를 입력하세요. / Enter a valid address.', defaultValue: 'invalid-address' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Read only example' } };
