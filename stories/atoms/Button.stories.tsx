import { Button, Icons } from "@/.";
import type { StoryObj } from "@storybook/nextjs-vite";
import { Meta } from "@storybook/nextjs-vite";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  text: "Button",
  onClick: () => alert("You have clicked on the button."),
};

export const TextOnly: Story = {
  args: baseArgs,
};

export const LeftIcon: Story = {
  args: {
    ...baseArgs,
    leftIcon: <Icons.PlusIcon size={14} />,
  },
};

export const RightIcon: Story = {
  args: {
    ...baseArgs,
    rightIcon: <Icons.MinusIcon size={14} />,
  },
};

export const BothIcons: Story = {
  args: {
    ...baseArgs,
    leftIcon: <Icons.SmileyXEyesIcon size={20} />,
    rightIcon: <Icons.SmileyMeltingIcon size={20} />,
  },
};

export const Wide: Story = {
  args: {
    ...baseArgs,
  },
};
