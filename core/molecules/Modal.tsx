import {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { Button } from "../atoms";
import { Colors } from "../foundations";

type ModalProps = {
  clickable: (openModal: MouseEventHandler<HTMLButtonElement>) => ReactNode;
  header?: ReactNode;
  content: ReactElement;
  footer?: ReactNode;
  width?: string;
  height?: string;
  isFullScreen?: boolean;
};

const Modal = ({ clickable, ...props }: ModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  const openModal = () => {
    setShowModal(true);
    lockScroll();
  };

  const closeModal = () => {
    setShowModal(false);
    unlockScroll();
  };

  return (
    <>
      {clickable(openModal)}
      {showModal ? <PopUp {...props} closeModal={closeModal} /> : <></>}
    </>
  );
};

export default Modal;

const useScrollLock = () => {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "initial";
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};

type PopUpProps = {
  header?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  width?: string;
  height?: string;
  isFullScreen?: boolean;
  closeModal: () => void;
};

const PopUp = ({
  header,
  content,
  footer,
  width,
  height,
  isFullScreen,
  closeModal,
}: PopUpProps) => (
  <Overlay>
    <ModalWindow $isFullScreen={isFullScreen} $width={width}>
      {header ? <ModalHeader>{header}</ModalHeader> : <></>}

      <ModalBody $isFullScreen={isFullScreen} $height={height}>
        {content}
      </ModalBody>

      <ModalFooter>
        <CancelButton onClick={() => closeModal()} />
        {footer ? footer : <></>}
      </ModalFooter>
    </ModalWindow>
  </Overlay>
);

const Overlay = styled.div`
  background-color: ${Colors.semantic.overlay};

  z-index: ${Number.MAX_SAFE_INTEGER};
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

const ModalWindow = styled.div<{ $isFullScreen?: boolean; $width?: string }>`
  background-color: ${Colors.base.white};
  border-radius: ${({ $isFullScreen }) => ($isFullScreen ? 0 : 6)}px;

  width: ${({ $isFullScreen, $width = "auto" }) =>
    $isFullScreen ? "100%" : $width};

  height: ${({ $isFullScreen }) => ($isFullScreen ? "100%" : "auto")};
  min-height: 100px;
`;

const ModalHeader = styled.div`
  font-weight: 500;
  font-size: 18px;

  padding: 12px 24px;
  border-bottom: 1px solid ${Colors.neutral.grey3};
`;

const ModalBody = styled.div<{ $isFullScreen?: boolean; $height?: string }>`
  display: flex;
  flex-direction: column;
  gap: 12px;

  height: ${({ $isFullScreen, $height = "auto" }) =>
    $isFullScreen ? "calc(100% - 160px)" : $height};

  padding-top: 24px;

  > * {
    width: 100%;
    height: 100%;

    padding: 0px 24px;
    border: none;

    overflow-y: auto;
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
