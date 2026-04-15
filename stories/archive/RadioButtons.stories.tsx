import { LocationIcon, RadioButtons } from "@/.";
import { Location } from "@grantbii/ui-core/location/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import styled from "styled-components";

type LabelProps = {
  location: Location;
};

const Label = ({ location }: LabelProps) => (
  <BaseLabel>
    <LocationIcon location={location} width={20} />
    <p>{location}</p>
  </BaseLabel>
);

const BaseLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

type ExampleProps = {
  controlled: boolean;
};

const RadioButtonsExample = ({ controlled }: ExampleProps) => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const controlledProps = {
    options: Object.values(Location)
      .filter((location) => location !== Location.UNKNOWN)
      .map((location) => ({
        value: location,
        label: <Label location={location} />,
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
      value: location,
      label: <Label location={location} />,
      onChange: () => alert(`Selected ${location}!`),
    })),
};

const meta: Meta<typeof RadioButtonsExample> = {
  title: "Archive/Radio Buttons",
  component: RadioButtonsExample,
  tags: ["autodocs"],
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
