import { Dropdown, mapEnumToOptions, type DropdownProps } from "@/.";
import { Objective } from "@grantbii/ui-core/grant/enums";
import { parseEnum } from "@grantbii/ui-core/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

type ExampleProps = {
  controlled: boolean;
};

const DropdownExample = ({ controlled }: ExampleProps) => {
  const [selectedObjective, setSelectedObjective] = useState(Objective.UNKNOWN);

  const controlledProps: DropdownProps = {
    ...baseProps,
    value: selectedObjective === Objective.UNKNOWN ? "" : selectedObjective,
    onChange: (event) =>
      setSelectedObjective(parseEnum(event.target.value, Objective)),
  };

  return <Dropdown {...(controlled ? controlledProps : uncontrolledProps)} />;
};

const baseProps: DropdownProps = {
  options: mapEnumToOptions(Objective),
  defaultLabel: "Select grant objective",
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
