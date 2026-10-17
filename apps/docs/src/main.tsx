import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@leejinw/ui';
import '@leejinw/ui/fonts.css';
import './app.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element is missing');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
