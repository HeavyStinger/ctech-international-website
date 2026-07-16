import * as React from 'react';

/** Static scattered star-point decoration (not an animated starfield). Parent needs position:relative. */
export interface StarFieldProps {
  /** Number of star points (default 24 — keep sparse) */
  count?: number;
  /** Seed for the deterministic scatter */
  seed?: number;
  /** Overall layer opacity (default 0.35) */
  opacity?: number;
  style?: React.CSSProperties;
}
export declare function StarField(props: StarFieldProps): JSX.Element;
