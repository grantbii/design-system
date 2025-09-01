import { Textarea } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Textarea> = {
  title: "Atoms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {
  args: { placeholder: "Type here" },
};

export const WithValidation: Story = {
  args: { placeholder: "Must be at least 10 characters long", minLength: 10 },
};
