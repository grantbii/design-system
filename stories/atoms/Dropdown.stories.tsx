import { Dropdown, mapEnumToOptions, type DropdownProps } from "@/.";
import { Need } from "@grantbii/ui-core/filter/enums";
import { parseEnum } from "@grantbii/ui-core/shared/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

type ExampleProps = {
  controlled: boolean;
};

const DropdownExample = ({ controlled }: ExampleProps) => {
  const [selectedNeed, setSelectedNeed] = useState(Need.UNKNOWN);

  const controlledProps: DropdownProps = {
    ...baseProps,
    value: selectedNeed === Need.UNKNOWN ? "" : selectedNeed,
    onChange: (event) => setSelectedNeed(parseEnum(event.target.value, Need)),
  };

  return <Dropdown {...(controlled ? controlledProps : uncontrolledProps)} />;
};

const baseProps: DropdownProps = {
  options: mapEnumToOptions(Need),
  defaultLabel: "Select your grant need",
};

const uncontrolledProps: DropdownProps = {
  ...baseProps,
  defaultValue: "",
};

const meta: Meta<typeof DropdownExample> = {
  title: "Atoms/Dropdown",
  component: DropdownExample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  args: {
    controlled: true,
  },
};

export const Uncontrolled: Story = {
  args: {
    controlled: false,
  },
};
