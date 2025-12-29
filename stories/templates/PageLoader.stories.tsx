import { PageLoader } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof PageLoader> = {
  title: "Templates/Page Loader",
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
    loadingText: "Loading...",
    tip: "Pro tip: go grab a cup of coffee while waiting for the page to load",
  },
};

export const AdminConsole: Story = {
  args: { pacman: true },
};
