import * as React from 'react';

/** THE signature hero moment — shimmering gradient headline. Use exactly once per page. */
export interface ShimmerHeadingProps {
  /** Heading tag (default 'h1') */
  as?: 'h1' | 'h2' | 'div';
  /** Font size px (default 80 — desktop hero) */
  size?: number;
  /** Animate the shimmer sweep (default true) */
  animated?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function ShimmerHeading(props: ShimmerHeadingProps): JSX.Element;
