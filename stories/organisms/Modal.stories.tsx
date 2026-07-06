import {
  applyTypography,
  Button,
  Modal,
  Spacing,
  SystemIcon,
  Typography,
  useModal,
} from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { MouseEventHandler, PropsWithChildren } from "react";
import styled from "styled-components";

type ModalDemoProps = {
  width?: string;
  height?: string;
} & PropsWithChildren;

const ModalDemo = ({ width, height, children }: ModalDemoProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button label="Click to open modal" onClick={() => openModal()} />

      {isModalOpen ? (
        <Modal width={width} height={height}>
          <ModalContent>
            <ModalHeader onClickClose={() => closeModal()} />
            {children}
          </ModalContent>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.px8};

  height: 100%;
  padding: ${Spacing.px20};
`;

type ModalHeaderProps = {
  onClickClose: MouseEventHandler<HTMLElement>;
};

const ModalHeader = ({ onClickClose }: ModalHeaderProps) => (
  <BaseModalHeader>
    <ModalTitle>Sample Modal Header</ModalTitle>
    <Button onClick={onClickClose} Icon={SystemIcon.XIcon} variant="ghost" />
  </BaseModalHeader>
);

const BaseModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  ${applyTypography(Typography.heading3)}
`;

const meta: Meta<typeof ModalDemo> = {
  title: "Organisms/Modal",
  component: Modal,
  tags: ["autodocs"],
  render: (args) => <ModalDemo {...args} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ShortContent: Story = {
  args: {
    children: <p>Amplifying Business Grant Impact for SMEs & Scale-ups</p>,
  },
};

const ModalBody = styled.div`
  overflow-y: auto;
`;

export const LongContent: Story = {
  args: {
    width: "500px",
    height: "300px",
    children: (
      <ModalBody>
        <p>
          Grantbii is an AI-powered grant intelligence and matching platform
          that helps grant seekers effortlessly find, match, prep & apply for
          the right business grants - maximizing grant funding success with
          minimal effort. Our platform connects businesses with a trusted Grant
          Enabler Network - solution providers, consulting experts, and delivery
          partners - ensuring that every dollar of grant funding leads to real
          business transformation impact.
        </p>

        <p>
          In the future, Grantbii aims to automate the entire grant application
          lifecycle, from discovery to claims submission and guide you through
          the application process with minimal effort on your part.
        </p>

        <p>
          To maximize your chances of grant success, you can expect to leverage
          on tools to assess your chances of success and offer expert support to
          ensure your application meets all necessary requirements.
        </p>
      </ModalBody>
    ),
  },
};
