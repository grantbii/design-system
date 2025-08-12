import { FileDrop, useFileDrop } from "@/.";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import styled from "styled-components";

const FileDropExample = () => {
  const { files, uploadFiles, removeFile, errorMessage } = useFileDrop();

  return (
    <Container>
      <FileDrop
        uploadedFiles={files}
        uploadFiles={uploadFiles}
        removeFile={removeFile}
        errorMessage={errorMessage}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
`;

const meta: Meta<typeof FileDropExample> = {
  title: "Molecules/File Drop",
  component: FileDropExample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
