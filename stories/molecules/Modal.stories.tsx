import { Button, Modal, useModal } from "@/.";
import type { StoryObj } from "@storybook/nextjs-vite";
import { Meta } from "@storybook/nextjs-vite";
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

const header = "What is Grantbii?";
const text =
  "Grantbii is an AI-powered grant intelligence and matching platform that helps grant seekers effortlessly find, match, prep & apply for the right business grants - maximizing grant funding success with minimal effort. Our platform connects businesses with a trusted Grant Enabler Network - solution providers, consulting experts, and delivery partners - ensuring that every dollar of grant funding leads to real business transformation impact.";

export const DesktopVersion: Story = {
  args: {
    header,
    content: <p>{text}</p>,
    width: "600px",
  },
};

export const MobileVersion: Story = {
  args: {
    header,
    content: <p>{text}</p>,
    isFullScreen: true,
  },
};
