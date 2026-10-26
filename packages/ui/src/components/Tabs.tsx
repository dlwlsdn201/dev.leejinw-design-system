import type { ComponentPropsWithRef } from 'react';
import { Tabs as Primitive } from 'radix-ui';
import styles from './extended.module.css';

export const Tabs = Primitive.Root;
export type TabsListProps = ComponentPropsWithRef<typeof Primitive.List>;
export type TabsTriggerProps = ComponentPropsWithRef<typeof Primitive.Trigger>;
export type TabsContentProps = ComponentPropsWithRef<typeof Primitive.Content>;

/** Groups tab triggers; provide an accessible label for the group. */
export const TabsList = ({ className, ...props }: TabsListProps) => <Primitive.List {...props} className={[styles.tabList, className].filter(Boolean).join(' ')} />;
/** Renders a roving-focus tab with selected and disabled states. */
export const TabsTrigger = ({ className, ...props }: TabsTriggerProps) => <Primitive.Trigger {...props} className={[styles.tab, className].filter(Boolean).join(' ')} />;
/** Renders the panel associated with its matching tab value. */
export const TabsContent = ({ className, ...props }: TabsContentProps) => <Primitive.Content {...props} className={[styles.tabPanel, className].filter(Boolean).join(' ')} />;
