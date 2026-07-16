import * as React from 'react';

/**
 * Deep-space HUD button. Primary = solid cyan with DARK text (never white-on-cyan).
 * Secondary = outline-glow (translucent black, 0.8px cyan border, layered glow).
 * One primary per view.
 * @startingPoint section="Components" subtitle="Primary, secondary outline-glow, and ghost buttons" viewport="700x260"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 'primary' solid cyan · 'secondary' outline-glow · 'ghost' text-only */
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
