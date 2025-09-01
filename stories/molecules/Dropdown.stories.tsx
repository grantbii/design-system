import { Dropdown } from "@/.";
import { Need } from "@grantbii/ui-base/grant/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Dropdown> = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const options = Object.values(Need)
  .filter((need) => need !== Need.UNKNOWN)
  .map((need) => ({ label: need, value: need }));

export const BasicExample: Story = {
  args: {
    options,
  },
};

export const WithValidation: Story = {
  args: {
    options,
    required: true,
  },
};
