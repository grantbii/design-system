import { Button, Modal, useModal } from "@/.";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReactNode } from "react";

type ModalExampleProps = {
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  width?: string;
  height?: string;
  isFullScreen?: boolean;
};

const ModalExample = (props: ModalExampleProps) => {
  const { showModal, openModal, closeModal } = useModal();

  return (
    <>
      <Button text="Click to open modal" onClick={openModal} />
      {showModal ? (
        <Modal {...props} onClickCancel={() => closeModal()} />
      ) : (
        <></>
      )}
    </>
  );
};

const meta: Meta<typeof ModalExample> = {
  title: "Molecules/Modal",
  component: ModalExample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const header = "Grantbii";

const shortContent = (
  <p>Amplifying Business Grant Impact for SMEs & Scale-ups</p>
);

const longContent = (
  <div>
    <p>
      Grantbii is an AI-powered grant intelligence and matching platform that
      helps grant seekers effortlessly find, match, prep & apply for the right
      business grants - maximizing grant funding success with minimal effort.
      Our platform connects businesses with a trusted Grant Enabler Network -
      solution providers, consulting experts, and delivery partners - ensuring
      that every dollar of grant funding leads to real business transformation
      impact.
    </p>

    <p>
      In the future, Grantbii aims to automate the entire grant application
      lifecycle, from discovery to claims submission and guide you through the
      application process with minimal effort on your part.
    </p>

    <p>
      To maximize your chances of grant success, you can expect to leverage on
      tools to assess your chances of success and offer expert support to ensure
      your application meets all necessary requirements.
    </p>
  </div>
);

export const PopUpWithShortContent: Story = {
  args: {
    header,
    content: shortContent,
    width: "600px",
  },
};

export const FullScreenWithShortContent: Story = {
  args: {
    header,
    content: shortContent,
    isFullScreen: true,
  },
};

export const PopUpWithLongContent: Story = {
  args: {
    header,
    content: longContent,
    width: "600px",
    height: "240px",
  },
};

export const FullScreenWithLongContent: Story = {
  args: {
    header,
    content: longContent,
    isFullScreen: true,
  },
};
