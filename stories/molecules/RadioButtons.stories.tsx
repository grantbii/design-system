import { RadioButtons } from "@/.";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const SINGAPORE = "Singapore";
const HONG_KONG = "Hong Kong";

type ExampleProps = {
  controlled: boolean;
};

const RadioButtonsExample = ({ controlled }: ExampleProps) => {
  const [location, setLocation] = useState("");

  const controlledProps = {
    options: [
      {
        label: SINGAPORE,
        value: SINGAPORE,
        checked: location === SINGAPORE,
        onClick: () => setLocation(SINGAPORE),
      },
      {
        label: HONG_KONG,
        value: HONG_KONG,
        checked: location === HONG_KONG,
        onClick: () => setLocation(HONG_KONG),
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
      label: SINGAPORE,
      value: SINGAPORE,
      onChange: () => alert(`Selected ${SINGAPORE}!`),
    },
    {
      label: HONG_KONG,
      value: HONG_KONG,
      onChange: () => alert(`Selected ${HONG_KONG}!`),
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
