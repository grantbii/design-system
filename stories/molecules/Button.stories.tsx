import { Button, SystemIcon, Flags } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Button> = {
  title: "Molecules/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const onClick = () => alert("Button Clicked");

export const Primary: Story = {
  args: {
    onClick,
    label: "Primary",
    variant: "primary",
    Icon: SystemIcon.PlusIcon,
  },
};

export const DisabledPrimary: Story = {
  args: {
    onClick,
    label: "Primary",
    variant: "primary",
    Icon: SystemIcon.PlusIcon,
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    onClick,
    label: "Secondary",
    variant: "secondary",
    Icon: SystemIcon.PlusIcon,
  },
};

export const DisabledSecondary: Story = {
  args: {
    onClick,
    label: "Secondary",
    variant: "secondary",
    Icon: SystemIcon.PlusIcon,
    disabled: true,
  },
};

export const Tertiary: Story = {
  args: {
    onClick,
    label: "Tertiary",
    variant: "tertiary",
    Icon: SystemIcon.PlusIcon,
  },
};

export const DisabledTertiary: Story = {
  args: {
    onClick,
    label: "Tertiary",
    variant: "tertiary",
    Icon: SystemIcon.PlusIcon,
    disabled: true,
  },
};

export const Outline: Story = {
  args: {
    onClick,
    label: "Outline",
    variant: "outline",
    Icon: SystemIcon.PlusIcon,
  },
};

export const DisabledOutline: Story = {
  args: {
    onClick,
    label: "Outline",
    variant: "outline",
    Icon: SystemIcon.PlusIcon,
    disabled: true,
  },
};

export const Ghost: Story = {
  args: {
    onClick,
    label: "Ghost",
    variant: "ghost",
    Icon: SystemIcon.PlusIcon,
  },
};

export const DisabledGhost: Story = {
  args: {
    onClick,
    label: "Ghost",
    variant: "ghost",
    Icon: SystemIcon.PlusIcon,
    disabled: true,
  },
};

export const Text: Story = {
  args: { onClick, label: "Text", variant: "text", Icon: SystemIcon.PlusIcon },
};

export const DisabledText: Story = {
  args: {
    onClick,
    label: "Text",
    variant: "text",
    Icon: SystemIcon.PlusIcon,
    disabled: true,
  },
};

export const Danger: Story = {
  args: {
    onClick,
    label: "Danger",
    variant: "danger",
    Icon: SystemIcon.PlusIcon,
  },
};

export const DisabledDanger: Story = {
  args: {
    onClick,
    label: "Danger",
    variant: "danger",
    Icon: SystemIcon.PlusIcon,
    disabled: true,
  },
};

export const Small: Story = {
  args: { onClick, label: "Small", size: "small", Icon: SystemIcon.PlusIcon },
};

export const Medium: Story = {
  args: { onClick, label: "Medium", size: "medium", Icon: SystemIcon.PlusIcon },
};

export const Large: Story = {
  args: { onClick, label: "Large", size: "large", Icon: SystemIcon.PlusIcon },
};

export const TextOnly: Story = {
  args: { onClick, label: "Text Only" },
};

export const LeftIcon: Story = {
  args: {
    onClick,
    label: "Left Icon",
    Icon: SystemIcon.PlusIcon,
    iconRight: false,
  },
};

export const RightIcon: Story = {
  args: {
    onClick,
    label: "Right Icon",
    Icon: SystemIcon.PlusIcon,
    iconRight: true,
  },
};

export const ActionIcon: Story = {
  args: { onClick, Icon: SystemIcon.PlusIcon },
};

export const WithHref: Story = {
  args: {
    label: "Opens grantbii.com",
    href: "https://grantbii.com",
    target: "_blank",
  },
};

export const HrefDisabled: Story = {
  args: {
    label: "Opens grantbii.com",
    href: "https://grantbii.com",
    target: "_blank",
    disabled: true,
  },
};

export const CustomLabel: Story = {
  args: {
    onClick,
    label: (
      <span>
        <Flags.SG width={20} /> Singapore
      </span>
    ),
    variant: "outline",
  },
};
