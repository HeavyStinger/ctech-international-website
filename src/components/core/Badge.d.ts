import * as React from 'react';

/** Small uppercase status label. 'cyan' for active/featured, 'neutral' for everything else. */
export interface BadgeProps {
  variant?: 'cyan' | 'neutral';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
