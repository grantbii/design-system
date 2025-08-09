import { RadioButtons } from "@/core/molecules";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof RadioButtons> = {
  title: "Molecules/Radio Buttons",
  component: RadioButtons,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  args: {
    name: "location ",
    options: [
      { label: "Singapore", value: "Singapore" },
      { label: "Hong Kong", value: "Hong Kong" },
    ],
  },
};
