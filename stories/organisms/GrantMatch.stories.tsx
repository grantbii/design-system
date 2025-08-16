import { GrantMatch } from "@/.";
import { useGrantMatchQueryItems } from "@/core/organisms/GrantMatch";
import { GrantMatchQuery } from "@grantbii/ui-base/match/models";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import styled from "styled-components";

type GrantMatchExampleProps = {
  isModalFullScreen?: boolean;
};
const GrantMatchExample = ({ isModalFullScreen }: GrantMatchExampleProps) => {
  const { query, updateQuery, removeQueryFile, removeQueryText, resetQuery } =
    useGrantMatchQueryItems();

  const onPerformGrantMatch = (newQuery: GrantMatchQuery) => {
    updateQuery(newQuery);
    console.log("finding grants...");
  };

  return (
    <Container>
      <GrantMatch
        query={query}
        onPerformGrantMatch={onPerformGrantMatch}
        removeQueryFile={removeQueryFile}
        removeQueryText={removeQueryText}
        resetQuery={resetQuery}
        isModalFullScreen={isModalFullScreen}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 90vw;
`;

const meta: Meta<typeof GrantMatchExample> = {
  title: "Organisms/Grant Match",
  component: GrantMatchExample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PopUp: Story = {
  args: {},
};

export const FullScreen: Story = {
  args: { isModalFullScreen: true },
};
