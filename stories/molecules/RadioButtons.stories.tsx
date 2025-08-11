import { RadioButtons } from "@/core/molecules";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof RadioButtons> = {
  title: "Molecules/Radio Buttons",
  component: RadioButtons,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NoneSelectedByDefault: Story = {
  args: {
    name: "location ",
    options: [
      {
        label: "Singapore",
        value: "Singapore",
        onChange: () => alert("Selected Singapore!"),
      },
      {
        label: "Hong Kong",
        value: "Hong Kong",
        onChange: () => alert("Selected Hong Kong!"),
      },
    ],
  },
};

export const OneSelectedByDefault: Story = {
  args: {
    name: "location ",
    options: [
      {
        label: "Singapore",
        value: "Singapore",
        onChange: () => alert("Selected Singapore!"),
        defaultChecked: true,
      },
      {
        label: "Hong Kong",
        value: "Hong Kong",
        onChange: () => alert("Selected Hong Kong!"),
      },
    ],
  },
};
