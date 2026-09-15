import * as React from 'react';

/** Hover tooltip — small HUD readout above the trigger. */
export interface TooltipProps {
  label: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
