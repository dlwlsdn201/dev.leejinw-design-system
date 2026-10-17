import type { ComponentPropsWithRef } from 'react';
import styles from './ui.module.css';

export interface LinkProps extends ComponentPropsWithRef<'a'> {
  variant?: 'default' | 'accent';
  isExternal?: boolean;
}

/** Renders a native anchor and preserves safe attributes for external destinations. */
export const Link = ({
  variant = 'default',
  isExternal = false,
  target,
  rel,
  className,
  children,
  ...anchorProps
}: LinkProps) => {
  const resolvedTarget = isExternal ? '_blank' : target;
  const resolvedRel = resolvedTarget === '_blank'
    ? Array.from(new Set([...(rel?.split(/\s+/).filter(Boolean) ?? []), 'noopener', 'noreferrer'])).join(' ')
    : rel;

  return (
    <a
      {...anchorProps}
      target={resolvedTarget}
      rel={resolvedRel}
      className={[styles.link, styles[`link-${variant}`], className].filter(Boolean).join(' ')}
    >
      {children}
      {isExternal && <span aria-hidden="true"> ↗</span>}
    </a>
  );
};
