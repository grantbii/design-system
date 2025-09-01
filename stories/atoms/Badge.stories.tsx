import { Badge, Icons } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultText = "Badge";
const longText = "the quick brown fox jumps over the lazy dog";
const onClickClose = () => alert("You have closed the badge.");

export const TextOnly: Story = {
  args: {
    text: defaultText,
  },
};

export const Icon: Story = {
  args: {
    Icon: Icons.SmileyXEyesIcon,
    text: defaultText,
  },
};

export const Closeable: Story = {
  args: {
    text: defaultText,
    onClickClose,
  },
};

export const LongText: Story = {
  args: {
    text: longText,
    textWidthPixels: 160,
  },
};

export const Everything: Story = {
  args: {
    Icon: Icons.SmileyXEyesIcon,
    text: longText,
    textWidthPixels: 160,
    onClickClose,
  },
};
