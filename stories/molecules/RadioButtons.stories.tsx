import { RadioButtons } from "@/.";
import { Location } from "@grantbii/ui-base/grant/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

type ExampleProps = {
  controlled: boolean;
};

const RadioButtonsExample = ({ controlled }: ExampleProps) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const controlledProps = {
    options: Object.values(Location)
      .filter((location) => location !== Location.UNKNOWN)
      .map((location) => ({
        label: location,
        value: location,
        checked: selectedLocation === location,
        onClick: () => setSelectedLocation(location),
      })),
  };

  return (
    <RadioButtons {...(controlled ? controlledProps : uncontrolledProps)} />
  );
};

const uncontrolledProps = {
  name: "location",
  options: Object.values(Location)
    .filter((location) => location !== Location.UNKNOWN)
    .map((location) => ({
      label: location,
      value: location,
      onChange: () => alert(`Selected ${location}!`),
    })),
};

const meta: Meta<typeof RadioButtonsExample> = {
  title: "Molecules/Radio Buttons",
  component: RadioButtonsExample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Uncontrolled: Story = {
  args: {
    controlled: false,
  },
};

export const Controlled: Story = {
  args: {
    controlled: true,
  },
};
