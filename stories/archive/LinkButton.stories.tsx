import { Color, SystemIcon, LinkButton } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LinkButton> = {
  title: "Archive/Link Button",
  component: LinkButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = { label: "Link", href: "https://grantbii.com" };

export const TextOnly: Story = {
  args: {
    ...baseArgs,
    onClick: () => alert("clicked on link"),
  },
};

export const LeftIcon: Story = {
  args: {
    ...baseArgs,
    LeftIcon: SystemIcon.PlusIcon,
  },
};

export const RightIcon: Story = {
  args: {
    ...baseArgs,
    RightIcon: SystemIcon.MinusIcon,
  },
};

export const BothSystemIcon: Story = {
  args: {
    ...baseArgs,
    LeftIcon: SystemIcon.SmileyXEyesIcon,
    RightIcon: SystemIcon.SmileyMeltingIcon,
  },
};

export const Underline: Story = {
  args: {
    ...baseArgs,
    underline: true,
    color: Color.typography.blackMedium,
  },
};
