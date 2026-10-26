import type { ComponentPropsWithRef } from 'react';
import { DropdownMenu as Primitive } from 'radix-ui';
import { OVERLAY_CONFIG } from './overlay-config';
import styles from './extended.module.css';

export const DropdownMenu = Primitive.Root;
export const DropdownMenuTrigger = Primitive.Trigger;
export type DropdownMenuContentProps = ComponentPropsWithRef<typeof Primitive.Content>;
export interface DropdownMenuItemProps extends ComponentPropsWithRef<typeof Primitive.Item> { tone?: 'default' | 'danger' }

/** Renders an action menu in a collision-aware portal. */
export const DropdownMenuContent = ({ className, ...props }: DropdownMenuContentProps) => <Primitive.Portal><Primitive.Content sideOffset={OVERLAY_CONFIG.sideOffset} collisionPadding={OVERLAY_CONFIG.collisionPadding} {...props} className={[styles.menu, className].filter(Boolean).join(' ')} /></Primitive.Portal>;

/** Renders a keyboard-selectable menu action, including unavailable actions. */
export const DropdownMenuItem = ({ className, tone = 'default', ...props }: DropdownMenuItemProps) => <Primitive.Item {...props} data-tone={tone} className={[styles.menuItem, className].filter(Boolean).join(' ')} />;
