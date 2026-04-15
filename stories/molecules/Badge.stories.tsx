import { Badge, Icons } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badge> = {
  title: "Molecules/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultText = "Badge";
const longText = "the quick brown fox jumps over the lazy dog";
const onClickClose = () => alert("You have closed the badge.");

export const TextOnly: Story = {
  args: {
    label: defaultText,
  },
};

export const Icon: Story = {
  args: {
    Icon: Icons.SmileyXEyesIcon,
    label: defaultText,
  },
};

export const Closeable: Story = {
  args: {
    label: defaultText,
    onClickClose,
  },
};

export const LongText: Story = {
  args: {
    label: longText,
    labelWidthPixels: 160,
  },
};

export const AlmostEverything: Story = {
  args: {
    Icon: Icons.SmileyXEyesIcon,
    label: longText,
    labelWidthPixels: 160,
    onClickClose,
  },
};

export const Clickable: Story = {
  args: {
    label: "Click Me",
    onClick: () => alert("Clicked on badge"),
  },
};
