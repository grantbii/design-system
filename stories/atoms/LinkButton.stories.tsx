import { Icons, LinkButton } from "@/.";
import type { StoryObj } from "@storybook/nextjs-vite";
import { Meta } from "@storybook/nextjs-vite";

const meta: Meta<typeof LinkButton> = {
  title: "Atoms/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  text: "Link",
  href: "https://grantbii.com",
  target: "_blank",
};

export const TextOnly: Story = {
  args: baseArgs,
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
