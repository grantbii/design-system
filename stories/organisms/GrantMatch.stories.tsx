import { Colors, GrantMatch } from "@/.";
import { useGrantMatchQueryItems } from "@/core/organisms/GrantMatch";
import { GrantMatchQuery } from "@grantbii/ui-base/match/models";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import styled from "styled-components";

type GrantMatchExampleProps = {
  isMobile?: boolean;
};
const GrantMatchExample = ({ isMobile }: GrantMatchExampleProps) => {
  const [status, setStatus] = useState("pending query");

  const performGrantMatch = (newQuery: GrantMatchQuery) => {
    const fileNames = newQuery.files.map((file) => file.name).join(", ");
    setStatus(
      `finding grants using files [${fileNames}] and text [${newQuery.text}]`,
    );
    setTimeout(() => setStatus("found grants"), 3000);
  };

  const resetGrantMatch = () => setStatus("pending query");

  const grantMatchQueryProps = useGrantMatchQueryItems(
    performGrantMatch,
    resetGrantMatch,
  );

  return (
    <Container $isMobile={isMobile}>
      <GrantMatch {...grantMatchQueryProps} isSmallerThanLaptop={isMobile} />
      <p>Status: {status}</p>
    </Container>
  );
};

const Container = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px;

  width: ${({ $isMobile = false }) => ($isMobile ? "360px" : "90vw")};
  height: ${({ $isMobile = false }) => ($isMobile ? "600px" : "100vh")};

  border: ${({ $isMobile = false }) =>
    $isMobile ? `1px solid ${Colors.neutral.grey2}` : "none"};
  border-radius: 32px;
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

export const Desktop: Story = {
  args: { isMobile: false },
};

export const Mobile: Story = {
  args: { isMobile: true },
};
