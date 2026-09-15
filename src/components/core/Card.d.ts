import * as React from 'react';

/** Standard panel: --space-surface, 1.6px --space-border, 12px radius. Flat & crisp — no blur. */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hover lifts surface + cyan border + soft glow */
  interactive?: boolean;
  /** Always-on soft cyan glow (featured content) */
  glow?: boolean;
  /** Inner padding in px (default 24) */
  padding?: number;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
