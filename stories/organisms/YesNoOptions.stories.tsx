import { YesNoOptions } from "@/.";
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof YesNoOptions> = {
  title: "Organisms/Yes-No Options",
  component: YesNoOptions,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  name: "question",
  yesProps: {},
  noProps: {},
};

export const YesOrNo: Story = {
  args: baseArgs,
};

export const YesOrNoOrUnsure: Story = {
  args: {
    ...baseArgs,
    unsureProps: {},
  },
};
