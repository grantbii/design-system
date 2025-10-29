import { Badges, mapEnumToOptions, type BadgeProps } from "@/.";
import { Objective } from "@grantbii/ui-core/grant/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badges> = {
  title: "Molecules/Badges",
  component: Badges,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      codePanel: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const allBadgeProps: BadgeProps[] = mapEnumToOptions(Objective);

export const ScrollableVertical: Story = {
  args: {
    allBadgeProps,
    scrollable: true,
    vertical: true,
  },
};

export const UnscrollableVertical: Story = {
  args: {
    allBadgeProps,
    scrollable: false,
    vertical: true,
  },
};

export const ScrollableHorizontal: Story = {
  args: {
    allBadgeProps,
    scrollable: true,
    vertical: false,
  },
};

export const UnscrollableHorizontal: Story = {
  args: {
    allBadgeProps,
    scrollable: false,
    vertical: false,
  },
};
