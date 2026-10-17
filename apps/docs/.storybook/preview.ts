import type { Preview } from '@storybook/react-vite';
import '@leejinw/ui/styles.css';
import '@leejinw/ui/fonts.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default preview;
