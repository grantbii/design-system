import { Dropdown, enumToOptions, type DropdownProps } from "@/.";
import { Objective } from "@grantbii/ui-core/grant/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

type ExampleProps = DropdownProps & {
  controlled: boolean;
};

const dropdownOptions = enumToOptions(Objective).slice(0, 5);
const optionsWithDisabledRow = dropdownOptions.map((option, index) =>
  index === 2 ? { ...option, disabled: true } : option,
);

const DropdownExample = ({ controlled, onChange, ...props }: ExampleProps) => {
  const [value, setValue] = useState(props.defaultValue ?? "");

  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <Dropdown
      {...props}
      {...(controlled
        ? { value: props.value ?? value, onChange: handleChange }
        : { onChange })}
    />
  );
};

const meta: Meta<typeof DropdownExample> = {
  title: "Organisms/Dropdown",
  component: DropdownExample,
  tags: ["autodocs"],
  args: {
    controlled: false,
    options: dropdownOptions,
    placeholder: "Select grant objective",
    defaultValue: "",
    disabled: false,
    hasError: false,
    size: "medium",
    width: 320,
    name: "objective",
    onChange: fn(),
  },
  argTypes: {
    controlled: {
      description:
        "Controls whether the selected value is managed by React state or by the Dropdown itself.",
      table: { defaultValue: { summary: "false" } },
    },
    options: {
      description: "Options displayed in the dropdown panel.",
      control: "object",
    },
    placeholder: {
      description: "Label displayed when no option is selected.",
      table: { defaultValue: { summary: '"Select an option"' } },
      control: "text",
    },
    value: {
      description: "Selected value when the Dropdown is controlled.",
      control: "text",
    },
    defaultValue: {
      description: "Initial selected value when the Dropdown is uncontrolled.",
      table: { defaultValue: { summary: '""' } },
      control: "text",
    },
    onChange: {
      description: "Called with the selected option value.",
      control: false,
    },
    disabled: {
      description: "Disables the dropdown trigger and form value.",
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    hasError: {
      description: "Displays the error state on the dropdown trigger.",
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    size: {
      description: "Trigger size.",
      table: { defaultValue: { summary: '"medium"' } },
      control: "radio",
      options: ["small", "medium"],
    },
    width: {
      description: "Width of the trigger and dropdown container.",
      table: { defaultValue: { summary: '"100%"' } },
      control: "text",
    },
    name: {
      description: "Form field name used to submit the selected value.",
      control: "text",
    },
    form: {
      description: "ID of the form associated with the hidden form field.",
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Controlled: Story = {
  args: {
    controlled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    await userEvent.click(canvas.getAllByRole("option")[0]);
    await expect(trigger).not.toHaveTextContent("Select grant objective");
    await expect(canvas.getAllByRole("option")[0]).toHaveAttribute(
      "aria-selected",
      "true",
    );
  },
};

export const Filled: Story = {
  args: {
    defaultValue: Objective.PROCESS_REDESIGN,
  },
};

export const ErrorState: Story = {
  args: {
    hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledRow: Story = {
  args: {
    options: optionsWithDisabledRow,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(canvas.getAllByRole("option")[2]).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};

export const Uncontrolled: Story = {};

export const FitContent: Story = {
  args: {
    width: "fit-content",
  },
};
