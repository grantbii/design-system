import { Dropdown, type DropdownProps } from "@/.";
import { Need, parseNeed } from "@grantbii/ui-base/filter/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

type ExampleProps = {
  controlled: boolean;
};

const DropdownExample = ({ controlled }: ExampleProps) => {
  const [selectedNeed, setSelectedNeed] = useState(Need.UNKNOWN);

  const controlledProps: DropdownProps = {
    options,
    defaultLabel,
    value: selectedNeed === Need.UNKNOWN ? "" : selectedNeed,
    onChange: (event) => setSelectedNeed(parseNeed(event.target.value)),
  };

  return <Dropdown {...(controlled ? controlledProps : uncontrolledProps)} />;
};

const defaultLabel = "Select your grant need";

const options = Object.values(Need)
  .filter((need) => need !== Need.UNKNOWN)
  .map((need) => ({ label: need, value: need }));

const uncontrolledProps: DropdownProps = {
  options,
  defaultLabel,
  defaultValue: "",
};

const meta: Meta<typeof DropdownExample> = {
  title: "Molecules/Dropdown",
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
