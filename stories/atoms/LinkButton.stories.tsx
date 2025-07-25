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

export const Default: Story = {
  args: {
    text: "Link",
    href: "https://grantbii.com",
    target: "_blank",
  },
};

export const Icon: Story = {
  args: {
    text: "Link",
    href: "https://grantbii.com",
    target: "_blank",
    leftIcon: <Icons.SmileyXEyesIcon size={20} />,
    rightIcon: <Icons.SmileyMeltingIcon size={20} />,
  },
};
