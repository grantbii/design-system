import { PageLoader } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import styled from "styled-components";

type PageLoaderExampleProps = {
  isPacman?: boolean;
  loadingText?: string;
  tip?: string;
};

const PageLoaderExample = (props: PageLoaderExampleProps) => (
  <BaseExample>
    <PageLoader {...props} />
  </BaseExample>
);

const BaseExample = styled.div`
  width: 100vw;
  height: 100vh;
`;

const meta: Meta<typeof PageLoaderExample> = {
  title: "Templates/Page Loader",
  component: PageLoaderExample,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
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
  args: { isPacman: true },
};
