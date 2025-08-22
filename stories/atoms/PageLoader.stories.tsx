import { PageLoader } from "@/.";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import styled from "styled-components";

type PageLoaderExampleProps = {
  isPacman?: boolean;
};

const PageLoaderExample = ({ isPacman }: PageLoaderExampleProps) => (
  <BaseExample>
    <PageLoader isPacman={isPacman} />
  </BaseExample>
);

const BaseExample = styled.div`
  width: 100vw;
  height: 100vh;
`;

const meta: Meta<typeof PageLoaderExample> = {
  title: "Atoms/Page Loader",
  component: PageLoaderExample,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const GrantbiiApp: Story = {
  args: {},
};

export const AdminConsole: Story = {
  args: { isPacman: true },
};
