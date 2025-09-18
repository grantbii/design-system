import { Button, Modal, useModal } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { JSX, ReactNode } from "react";

type ModalExampleProps = {
  header?: ReactNode;
  content: JSX.Element;
  footer?: ReactNode;
  width?: string;
  height?: string;
};

const ModalExample = (props: ModalExampleProps) => {
  const { showModal, openModal, closeModal } = useModal();

  return (
    <div>
      <Button text="Click to open modal" onClick={() => openModal()} />

      {showModal ? (
        <Modal {...props} onClickClose={() => closeModal()} />
      ) : (
        <></>
      )}
    </div>
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

const baseArgs = {
  header: "Grantbii",
  width: "600px",
  height: "360px",
};

const shortContent = (
  <p>Amplifying Business Grant Impact for SMEs & Scale-ups</p>
);

export const ShortContent: Story = {
  args: {
    ...baseArgs,
    content: shortContent,
  },
};

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

export const LongContent: Story = {
  args: {
    ...baseArgs,
    content: longContent,
  },
};
