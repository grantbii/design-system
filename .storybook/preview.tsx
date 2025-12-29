import type { Preview } from "@storybook/nextjs-vite";
import { FunctionComponent } from "react";
import { GlobalStyle } from "../index";

const preview: Preview = {
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
    },
    layout: "centered",
  },
};

export default preview;

export const decorators = [
  (Story: FunctionComponent) => (
    <>
      <GlobalStyle />
      <Story />
    </>
  ),
];
