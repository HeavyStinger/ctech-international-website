import * as React from 'react';

/** Square icon-only button; same variants as Button. Always pass a label for a11y. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Accessible name (aria-label + title) */
  label: string;
  disabled?: boolean;
  /** The icon element (Lucide, 16–20px, 1.5–2px stroke) */
  children?: React.ReactNode;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
