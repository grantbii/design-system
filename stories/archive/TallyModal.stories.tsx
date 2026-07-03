import { Button, TallyModal, useModal } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { type ReactNode } from "react";

type TallyModalExampleProps = {
  header?: ReactNode;
  tallyId: string;
  prefilledFieldsQueryParams?: string;
};

const TallyModalExample = (props: TallyModalExampleProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button label="Click to open modal" onClick={() => openModal()} />
      {isModalOpen ? (
        <TallyModal {...props} onClickClose={() => closeModal()} />
      ) : (
        <></>
      )}
    </>
  );
};

const meta: Meta<typeof TallyModalExample> = {
  title: "Archive/Tally Modal",
  component: TallyModalExample,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    header: "Apply with us",
    tallyId: "3jAj5Q",
  },
};
