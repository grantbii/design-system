import type { ReactNode } from "react";

// TODO: refactor away

export type ScreenSize = "small" | "large";

export type Option = {
  label: ReactNode;
  value: string;
};
