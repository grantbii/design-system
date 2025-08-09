import { Button, Icons } from "@/.";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

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
