import { PageLoader } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof PageLoader> = {
  title: "Molecules/Page Loader",
  component: PageLoader,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const GrantInsights: Story = {
  args: {},
};

export const GrantbiiDashboard: Story = {
  args: {
    loadingText: "Loading Forever...",
    tip: "Pro tip: grab a cup of coffee while waiting for it to load. Or watch The Lord of the Rings. Or whatever",
  },
};

export const AdminConsole: Story = {
  args: { pacman: true },
};
