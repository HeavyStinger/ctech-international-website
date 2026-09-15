import * as React from 'react';

/** Modal on a space-black scrim; standard card treatment + soft glow. No backdrop blur. */
export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Action buttons, right-aligned */
  footer?: React.ReactNode;
  width?: number;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
