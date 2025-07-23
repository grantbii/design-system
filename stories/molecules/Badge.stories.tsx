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

const DEFAULT_TEXT = "Badge";
const LONG_TEXT = "the quick brown fox jumps over the lazy dog";

const ICON = <Icons.SmileyXEyesIcon size={20} />;
const ON_CLICK_CLOSE = () => alert("You have closed the badge!");

export const Default: Story = {
  args: {
    text: DEFAULT_TEXT,
  },
};

export const Icon: Story = {
  args: {
    icon: ICON,
    text: DEFAULT_TEXT,
  },
};

export const Close: Story = {
  args: {
    text: DEFAULT_TEXT,
    onClickClose: ON_CLICK_CLOSE,
  },
};

export const Long: Story = {
  args: {
    text: LONG_TEXT,
    textWidthPixels: 160,
  },
};

export const Everything: Story = {
  args: {
    icon: ICON,
    text: LONG_TEXT,
    textWidthPixels: 160,
    onClickClose: ON_CLICK_CLOSE,
  },
};
