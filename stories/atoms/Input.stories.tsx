import { Input } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicInput: Story = {
  args: { placeholder: "Type here" },
};

export const NumericalField: Story = {
  args: { placeholder: "Numbers only", type: "number" },
};

export const EmailField: Story = {
  args: { placeholder: "Enter your email", type: "email" },
};

export const MinimumLength: Story = {
  args: { placeholder: "At least 10 characters", minLength: 10 },
};
