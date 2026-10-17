import type { ReactNode } from 'react';
import '@leejinw/ui/styles.css';
import '@leejinw/ui/fonts.css';

/** Provides the document shell for the Next.js package integration check. */
const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="ko">
    <body>{children}</body>
  </html>
);

export default RootLayout;
