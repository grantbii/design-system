import { Badge, Icons } from "@/.";
import type { StoryObj } from "@storybook/nextjs-vite";
import { Meta } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badge> = {
  title: "Design System/Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Badge",
  },
};

export const Icon: Story = {
  args: {
    icon: <Icons.SmileyXEyesIcon size={20} />,
    text: "Badge",
  },
};

export const Close: Story = {
  args: {
    text: "Badge",
    onClickClose: () => alert("closed badge"),
  },
};

export const Everything: Story = {
  args: {
    icon: <Icons.SmileyXEyesIcon size={20} />,
    text: "Badge",
    onClickClose: () => alert("You have closed the badge!"),
  },
};
