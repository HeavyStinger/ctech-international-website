import * as React from 'react';

/** HUD toggle — square thumb (no pill), cyan track glow when on. */
export interface SwitchProps {
  label?: React.ReactNode;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
