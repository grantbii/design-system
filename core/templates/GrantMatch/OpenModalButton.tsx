import styled from "styled-components";
import { Color, Responsive, SystemIcon, Typography } from "../../atoms";
import { applyTypography } from "../../integrations";
import { useGrantMatchContext } from "./context";

type OpenModalButtonProps = {
  openModalCallback?: () => void;
};

const OpenModalButton = ({ openModalCallback }: OpenModalButtonProps) => {
  const { openModal } = useGrantMatchContext();

  const onClickOpen = () => {
    if (openModalCallback) {
      openModalCallback();
    }

    openModal();
  };

  return (
    <BaseOpenModalButton onClick={onClickOpen}>
      <SystemIcon.FileArrowUpIcon size={20} />
      <OpenModalButtonText>File Drop</OpenModalButtonText>
    </BaseOpenModalButton>
  );
};

export default OpenModalButton;

const BaseOpenModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  height: 40px;

  border-radius: 8px;

  background-color: ${Color.neutral.grey3};
  color: ${Color.typography.blackHigh};

  ${applyTypography(Typography.bodySecondaryRegular)}

  &:hover {
    background-color: ${Color.accent.blue3};
  }

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 40px;
    min-width: 40px;
    padding: 0px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: auto;
    min-width: 90px;
    padding: 2px 16px;
  }
`;

const OpenModalButtonText = styled.p`
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }
`;
