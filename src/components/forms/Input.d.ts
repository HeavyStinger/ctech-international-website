import * as React from 'react';

/** Text field on translucent space-black; focus = cyan border + soft glow. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Error message; turns the border red and replaces the hint */
  error?: string;
  /** Render a textarea instead */
  multiline?: boolean;
}
export declare function Input(props: InputProps): JSX.Element;
