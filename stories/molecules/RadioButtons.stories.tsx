import { RadioButtons } from "@/.";
import { Location } from "@grantbii/ui-base/grant/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

type ExampleProps = {
  controlled: boolean;
};

const RadioButtonsExample = ({ controlled }: ExampleProps) => {
  const [location, setLocation] = useState("");

  const controlledProps = {
    options: [
      {
        label: Location.SINGAPORE,
        value: Location.SINGAPORE,
        checked: location === Location.SINGAPORE,
        onClick: () => setLocation(Location.SINGAPORE),
      },
      {
        label: Location.HONG_KONG,
        value: Location.HONG_KONG,
        checked: location === Location.HONG_KONG,
        onClick: () => setLocation(Location.HONG_KONG),
      },
    ],
  };

  return (
    <RadioButtons {...(controlled ? controlledProps : uncontrolledProps)} />
  );
};

const uncontrolledProps = {
  name: "location",
  options: [
    {
      label: Location.SINGAPORE,
      value: Location.SINGAPORE,
      onChange: () => alert(`Selected ${Location.SINGAPORE}!`),
    },
    {
      label: Location.HONG_KONG,
      value: Location.HONG_KONG,
      onChange: () => alert(`Selected ${Location.HONG_KONG}!`),
    },
  ],
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
