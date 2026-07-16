import * as React from 'react';

/** Underline tabs; active gets a cyan indicator + faint text glow. */
export interface TabsProps {
  items: { id: string; label: string }[];
  activeId: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
