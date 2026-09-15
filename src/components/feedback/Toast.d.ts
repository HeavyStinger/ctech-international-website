import * as React from 'react';

/** Notification card. 'success' glows cyan; 'error' is the ONLY place red appears. */
export interface ToastProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'info' | 'success' | 'error';
  onDismiss?: () => void;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
