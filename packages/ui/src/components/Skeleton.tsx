import type { ComponentPropsWithRef } from 'react';
import styles from './extended.module.css';

export type SkeletonProps = Omit<ComponentPropsWithRef<'div'>, 'children'>;

/** Renders decorative loading geometry; the enclosing region supplies aria-busy and a label. */
export const Skeleton = ({ className, ...props }: SkeletonProps) => <div {...props} aria-hidden="true" className={[styles.skeleton, className].filter(Boolean).join(' ')} />;
