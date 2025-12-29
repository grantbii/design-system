import { ErrorFallback } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ErrorFallback> = {
  title: "Templates/Error Fallback",
  component: ErrorFallback,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Reload: Story = {
  args: {
    onClickReload: () => alert("reloading..."),
  },
};
