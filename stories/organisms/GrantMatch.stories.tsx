import { GrantMatch } from "@/.";
import { useGrantMatchActiveQuery } from "@/core/organisms/GrantMatch";
import { GrantMatchQuery } from "@grantbii/ui-base/match/models";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import styled from "styled-components";

const GrantMatchExample = () => {
  const [status, setStatus] = useState("pending query");

  const performGrantMatch = (newQuery: GrantMatchQuery) => {
    const fileNames = newQuery.files.map((file) => file.name).join(", ");
    const printableQuery = `files [${fileNames}] and text [${newQuery.text}]`;

    setStatus(`finding grants using ${printableQuery}`);
    setTimeout(() => setStatus(`found grants with ${printableQuery}`), 3000);
  };

  const resetGrantMatch = () => setStatus("pending query");

  const grantMatchQueryProps = useGrantMatchActiveQuery(
    performGrantMatch,
    resetGrantMatch,
  );

  return (
    <Container>
      <GrantMatch {...grantMatchQueryProps} />
      <p>Status: {status}</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;
`;

const meta: Meta<typeof GrantMatchExample> = {
  title: "Organisms/Grant Match",
  component: GrantMatchExample,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
