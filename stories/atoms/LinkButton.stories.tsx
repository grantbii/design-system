import { Colors, Icons, LinkButton } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LinkButton> = {
  title: "Atoms/Link Button",
  component: LinkButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = { text: "Link", href: "https://grantbii.com" };

export const TextOnly: Story = {
  args: {
    ...baseArgs,
    onClick: () => alert("clicked on link"),
  },
};

export const LeftIcon: Story = {
  args: {
    ...baseArgs,
    LeftIcon: Icons.PlusIcon,
  },
};

export const RightIcon: Story = {
  args: {
    ...baseArgs,
    RightIcon: Icons.MinusIcon,
  },
};

export const BothIcons: Story = {
  args: {
    ...baseArgs,
    LeftIcon: Icons.SmileyXEyesIcon,
    RightIcon: Icons.SmileyMeltingIcon,
  },
};

export const Underline: Story = {
  args: {
    ...baseArgs,
    underline: true,
    color: Colors.typography.blackMedium,
  },
};
