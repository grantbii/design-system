import { GrantMatch } from "@/.";
import { useGrantMatchQueryItems } from "@/core/organisms/GrantMatch";
import { GrantMatchQuery } from "@grantbii/ui-base/match/models";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import styled from "styled-components";

type GrantMatchExampleProps = {
  isModalFullScreen?: boolean;
};
const GrantMatchExample = ({ isModalFullScreen }: GrantMatchExampleProps) => {
  const [status, setStatus] = useState("Pending input");

  const performGrantMatch = (newQuery: GrantMatchQuery) => {
    const fileNames = newQuery.files.map((file) => file.name).join(", ");
    setStatus(
      `Finding grants using files [${fileNames}] and text [${newQuery.text}]`,
    );
    setTimeout(() => setStatus("Found grants"), 3000);
  };

  const resetGrantMatch = () => setStatus("Pending input");

  const grantMatchQueryProps = useGrantMatchQueryItems(
    performGrantMatch,
    resetGrantMatch,
  );

  return (
    <Container>
      <GrantMatchStatus>Status: {status}</GrantMatchStatus>

      <GrantMatch
        {...grantMatchQueryProps}
        isModalFullScreen={isModalFullScreen}
      />
    </Container>
  );
};

const GrantMatchStatus = styled.p`
  margin: 0px 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

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
