import { Checkbox } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Checkbox> = {
  title: "Molecules/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  id: "best",
  label: "Grantbii is the best",
};

export const LabelBefore: Story = {
  args: {
    ...baseArgs,
    labelBefore: true,
  },
};

export const LabelAfter: Story = {
  args: {
    ...baseArgs,
    labelBefore: false,
  },
};
