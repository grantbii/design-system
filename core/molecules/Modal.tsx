import {
  type JSX,
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { Button } from "../atoms";
import { Colors, Responsive } from "../foundations";
import { createPortal } from "react-dom";

type ModalProps = {
  header?: ReactNode;
  content: JSX.Element;
  footer?: ReactNode;
  width?: string;
  height?: string;
  onClickCancel: MouseEventHandler<HTMLButtonElement>;
  cancelText?: string;
};

const Modal = ({
  header,
  content,
  footer,
  width,
  height,
  onClickCancel,
  cancelText,
}: ModalProps) =>
  createPortal(
    <Overlay>
      <ModalWindow $width={width} $height={height}>
        {header ? <ModalHeader>{header}</ModalHeader> : <></>}

        <ModalBody>{content}</ModalBody>

        <ModalFooter>
          <CancelButton onClick={onClickCancel} cancelText={cancelText} />
          {footer ? footer : <></>}
        </ModalFooter>
      </ModalWindow>
    </Overlay>,
    document.body,
  );

export default Modal;

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "initial";
  }, []);

  const openModal = () => {
    setShowModal(true);
    lockScroll();
  };

  const closeModal = () => {
    setShowModal(false);
    unlockScroll();
  };

  return {
    showModal,
    openModal,
    closeModal,
  };
};

const Overlay = styled.div`
  background-color: ${Colors.semantic.overlay};

  z-index: 9999;
  position: fixed;
  top: 0px;
  left: 0px;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalWindow = styled.div<{ $width?: string; $height?: string }>`
  display: flex;
  flex-direction: column;

  background-color: ${Colors.base.white};

  min-height: 100px;
  max-height: 100vh;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    position: fixed;
    bottom: 0px;
    left: 0px;

    width: 100%;
    height: 100%;

    border-radius: 0px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    position: static;
    bottom: auto;
    left: auto;

    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};

    border-radius: 6px;
  }
`;

const ModalHeader = styled.div`
  font-weight: 500;
  font-size: 18px;

  padding: 12px 24px;
  border-bottom: 1px solid ${Colors.neutral.grey3};
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding-top: 24px;
  overflow-y: auto;

  > * {
    width: 100%;
    height: 100%;
    min-height: 100px;

    padding: 2px 24px;
    border: none;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  padding: 24px;
`;

type CancelButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  cancelText?: string;
};

const CancelButton = ({
  onClick,
  cancelText = "Cancel",
}: CancelButtonProps) => (
  <Button
    text={cancelText}
    onClick={onClick}
    backgroundColor={Colors.neutral.grey3}
    color={Colors.typography.blackHigh}
  />
);
