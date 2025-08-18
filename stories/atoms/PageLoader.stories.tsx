import { PageLoader } from "@/.";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof PageLoader> = {
  title: "Atoms/Page Loader",
  component: PageLoader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
