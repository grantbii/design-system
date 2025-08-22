import { MouseEventHandler, ReactNode, useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { Button } from "../atoms";
import { Colors } from "../foundations";

type ModalProps = {
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  width?: string;
  height?: string;
  isFullScreen?: boolean;
  onClickCancel: MouseEventHandler<HTMLButtonElement>;
};

const Modal = ({
  header,
  content,
  footer,
  width,
  height,
  isFullScreen,
  onClickCancel,
}: ModalProps) => (
  <Overlay $isFullScreen={isFullScreen}>
    <ModalWindow $isFullScreen={isFullScreen} $width={width} $height={height}>
      {header ? <ModalHeader>{header}</ModalHeader> : <></>}

      <ModalBody>{content}</ModalBody>

      <ModalFooter>
        <CancelButton onClick={onClickCancel} />
        {footer ? footer : <></>}
      </ModalFooter>
    </ModalWindow>
  </Overlay>
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

const Overlay = styled.div<{ $isFullScreen?: boolean }>`
  background-color: ${Colors.semantic.overlay};

  z-index: ${({ $isFullScreen }) =>
    $isFullScreen ? Number.MAX_SAFE_INTEGER - 1 : Number.MAX_SAFE_INTEGER};
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

const ModalWindow = styled.div<{
  $isFullScreen?: boolean;
  $width?: string;
  $height?: string;
}>`
  display: flex;
  flex-direction: column;

  background-color: ${Colors.base.white};
  border-radius: ${({ $isFullScreen }) => ($isFullScreen ? 0 : 6)}px;

  width: ${({ $isFullScreen, $width = "auto" }) =>
    $isFullScreen ? "100%" : $width};
  height: ${({ $isFullScreen, $height = "auto" }) =>
    $isFullScreen ? "100%" : $height};

  min-height: 100px;
  max-height: 100vh;

  ${({ $isFullScreen = false }) =>
    $isFullScreen
      ? css`
          position: fixed;
          bottom: 0px;
          left: 0px;
        `
      : ""}
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
};

const CancelButton = ({ onClick }: CancelButtonProps) => (
  <Button
    text="Cancel"
    onClick={onClick}
    backgroundColor={Colors.neutral.grey3}
    color={Colors.typography.blackHigh}
  />
);
