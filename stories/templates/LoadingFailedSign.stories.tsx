import { LoadingFailedSign } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LoadingFailedSign> = {
  title: "Templates/Loading-Failed Sign",
  component: LoadingFailedSign,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
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
