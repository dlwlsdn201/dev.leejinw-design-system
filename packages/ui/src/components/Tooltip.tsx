import type { ReactElement } from 'react';
import { Tooltip as Primitive } from 'radix-ui';
import { OVERLAY_CONFIG } from './overlay-config';
import styles from './extended.module.css';

export interface TooltipProps extends Omit<Primitive.TooltipProps, 'children'> { children: ReactElement; content: string }

/** Adds a non-interactive description to a focusable trigger; essential information stays visible. */
export const Tooltip = ({ children, content, ...props }: TooltipProps) => <Primitive.Provider delayDuration={OVERLAY_CONFIG.tooltipDelay}><Primitive.Root {...props}>
  <Primitive.Trigger asChild>{children}</Primitive.Trigger>
  <Primitive.Portal><Primitive.Content className={styles.tooltip} sideOffset={OVERLAY_CONFIG.sideOffset} collisionPadding={OVERLAY_CONFIG.collisionPadding}>{content}</Primitive.Content></Primitive.Portal>
</Primitive.Root></Primitive.Provider>;
