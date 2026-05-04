import { BrandLogo } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof BrandLogo> = {
  title: "Atoms/Brand Logo",
  component: BrandLogo,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const FullColor: Story = {
  args: {
    colorVariant: "full",
    isLogomark: false,
  },
};

export const ReversedColor: Story = {
  args: {
    colorVariant: "reversed",
    isLogomark: false,
  },
};

export const FullColorLogomark: Story = {
  args: {
    colorVariant: "full",
    isLogomark: true,
  },
};

export const ReversedColorLogomark: Story = {
  args: {
    colorVariant: "reversed",
    isLogomark: true,
  },
};
