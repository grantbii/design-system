import type { Preview } from "@storybook/nextjs-vite";
import { GlobalStyle } from "../index";
import { FunctionComponent } from "react";

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
