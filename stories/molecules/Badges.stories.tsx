import { Badges, mapEnumToOptions, type BadgeProps } from "@/.";
import { Objective } from "@grantbii/ui-core/grant/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badges> = {
  title: "Molecules/Badges",
  component: Badges,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const allBadgeProps: BadgeProps[] = mapEnumToOptions(Objective).map(
  (option) => ({ text: option.label }),
);

export const Scrollable: Story = {
  args: {
    allBadgeProps,
    isScrollable: true,
  },
};

export const WrapAround: Story = {
  args: {
    allBadgeProps,
    isScrollable: false,
  },
};
