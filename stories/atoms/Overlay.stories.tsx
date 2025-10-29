import { Overlay } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Overlay> = {
  title: "Atoms/Overlay",
  component: Overlay,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Content" },
};

export const CenteredContent: Story = {
  args: { children: "Content", $centerContent: true },
};
