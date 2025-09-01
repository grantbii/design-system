import { BrandLogo } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof BrandLogo> = {
  title: "Atoms/Brand Logo",
  component: BrandLogo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Light: Story = {
  args: {
    isDarkTheme: false,
  },
};

export const Dark: Story = {
  args: {
    isDarkTheme: true,
  },
};
