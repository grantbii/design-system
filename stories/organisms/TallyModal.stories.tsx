import { Button, TallyModal, useModal } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { type ReactNode } from "react";

type TallyModalExampleProps = {
  header?: ReactNode;
  tallyId: string;
  prefilledFieldsQueryParams?: string;
};

const TallyModalExample = (props: TallyModalExampleProps) => {
  const { showModal, openModal, closeModal } = useModal();

  return (
    <>
      <Button text="Click to open modal" onClick={() => openModal()} />
      {showModal ? (
        <TallyModal {...props} onClickClose={() => closeModal()} />
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

export const Example: Story = {
  args: {
    header: "Apply with us",
    tallyId: "3jAj5Q",
  },
};
