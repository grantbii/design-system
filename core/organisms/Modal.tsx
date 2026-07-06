import { type PropsWithChildren, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Color, Responsive, Spacing } from "../atoms";
import { Overlay } from "../molecules";

type ModalProps = {
  width?: string;
  height?: string;
} & PropsWithChildren;

const Modal = ({ width = "auto", height = "auto", children }: ModalProps) =>
  createPortal(
    <Overlay $centerContent>
      <ModalWindow $width={width} $height={height}>
        {children}
      </ModalWindow>
    </Overlay>,
    document.body,
  );

export default Modal;

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = "initial";
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    lockScroll();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    unlockScroll();
  };

  return {
    openModal,
    closeModal,
    isModalOpen,
  };
};

const ModalWindow = styled.div<{ $width: string; $height: string }>`
  display: flex;
  flex-direction: column;

  background-color: ${Color.neutral.white};

  min-height: ${Spacing.px100};
  max-height: 100vh;

  @media (width < ${Responsive.widthBreakpoint.laptop}) {
    position: fixed;
    bottom: 0px;
    left: 0px;

    width: 100%;
    height: 100%;

    border-radius: 0px;
  }

  @media (width >= ${Responsive.widthBreakpoint.laptop}) {
    position: static;
    bottom: auto;
    left: auto;

    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};

    border-radius: ${Spacing.px8};
  }
`;
