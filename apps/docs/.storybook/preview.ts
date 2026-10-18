import type { Preview } from '@storybook/react-vite';
import '@dev.leejinw/ui/styles.css';
import '@dev.leejinw/ui/fonts.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default preview;
