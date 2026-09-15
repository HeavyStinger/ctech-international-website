import * as React from 'react';

/** Radio — the one circular control (dot metaphor); cyan dot + glow when selected. */
export interface RadioProps {
  label?: React.ReactNode;
  checked: boolean;
  onChange?: (value: string) => void;
  name?: string;
  value: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
