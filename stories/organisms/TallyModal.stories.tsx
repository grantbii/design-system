import { Button, TallyModal, useModal } from "@/.";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReactNode } from "react";

type TallyModalExampleProps = {
  header?: ReactNode;
  tallyId: string;
  prefilledFieldsQueryParams?: string;
  isFullScreen?: boolean;
};

const TallyModalExample = (props: TallyModalExampleProps) => {
  const { showModal, openModal, closeModal } = useModal();

  return (
    <>
      <Button text="Click to open modal" onClick={() => openModal()} />
      {showModal ? (
        <TallyModal {...props} onClickCancel={() => closeModal()} />
      ) : (
        <></>
      )}
    </>
  );
};

const meta: Meta<typeof TallyModalExample> = {
  title: "Organisms/Tally Modal",
  component: TallyModalExample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  header: "Apply with us",
  tallyId: "3jAj5Q",
};

export const PopUp: Story = {
  args: baseArgs,
};

export const FullScreen: Story = {
  args: {
    ...baseArgs,
    isFullScreen: true,
  },
};
