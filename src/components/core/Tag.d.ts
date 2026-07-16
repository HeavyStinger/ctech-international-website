import * as React from 'react';

/** Removable filter/topic chip. */
export interface TagProps {
  children?: React.ReactNode;
  /** Renders a × button when provided */
  onRemove?: () => void;
  style?: React.CSSProperties;
}
export declare function Tag(props: TagProps): JSX.Element;
