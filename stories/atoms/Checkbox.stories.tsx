import { Checkbox } from "@/.";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const label = "Grantbii is the best";

export const LabelBefore: Story = {
  args: {
    label,
    labelBefore: true,
  },
};

export const LabelAfter: Story = {
  args: {
    label,
    labelBefore: false,
  },
};
