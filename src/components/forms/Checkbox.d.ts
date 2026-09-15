import * as React from 'react';

/** HUD checkbox — sharp corners, cyan fill with dark check when on. */
export interface CheckboxProps {
  label?: React.ReactNode;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
