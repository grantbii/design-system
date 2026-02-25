import { Colors, Icons, Input, mapEnumToOptions } from "@/.";
import { CostItem } from "@grantbii/ui-core/grant/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
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

export const Datalist: Story = {
  args: {
    placeholder: "Enter a cost item",
    datalistId: "supportable-cost-items",
    datalistOptions: mapEnumToOptions(CostItem),
  },
};

export const CustomError: Story = {
  args: {
    $hasError: true,
  },
};

export const LeftIcon: Story = {
  args: {
    placeholder: "Type here",
    LeftIcon: Icons.PlusIcon,
    iconColor: Colors.neutral.grey2,
  },
};

export const RightIcon: Story = {
  args: {
    placeholder: "Type here",
    RightIcon: Icons.MinusIcon,
    iconColor: Colors.neutral.grey2,
  },
};

export const BothIcons: Story = {
  args: {
    placeholder: "Type here",
    LeftIcon: Icons.CurrencyDollarIcon,
    RightIcon: Icons.PencilSimpleIcon,
    iconColor: Colors.neutral.grey2,
  },
};
