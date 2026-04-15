import type { ComponentType, MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { Colors, Icons, Responsive } from "../atoms";
import { HelperFontSize } from "../integrations";

export type BadgeProps = {
  label: ReactNode;
  Icon?: ComponentType<Icons.IconProps>;
  iconSize?: string | number;
  iconWeight?: Icons.IconWeight;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
  labelWidthPixels?: number;
  backgroundColor?: string;
  color?: string;
};

const Badge = ({
  label,
  Icon,
  iconSize = 20,
  iconWeight = "regular",
  onClick,
  onClickClose,
  labelWidthPixels,
  backgroundColor,
  color,
}: BadgeProps) => (
  <BaseBadge
    onClick={onClick}
    $clickable={!!onClick}
    $backgroundColor={backgroundColor}
    $color={color}
  >
    <BadgeContent $closeable={!!onClickClose} $widthPixels={labelWidthPixels}>
      {Icon ? (
        <IconContainer>
          <Icon color={color} size={iconSize} weight={iconWeight} />
        </IconContainer>
      ) : (
        <></>
      )}

      <BadgeLabel>{label}</BadgeLabel>
    </BadgeContent>

    {onClickClose ? <CloseButton onClick={onClickClose} /> : <></>}
  </BaseBadge>
);

export default Badge;

const BaseBadge = styled.div<{
  $clickable?: boolean;
  $backgroundColor?: string;
  $color?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 5px 15px;
  border-radius: 120px;

  color: ${({ $color = Colors.typography.blackHigh }) => $color};
  background-color: ${({ $backgroundColor = Colors.neutral.grey3 }) =>
    $backgroundColor};

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    min-height: 27px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    min-height: 30px;
  }

  cursor: ${({ $clickable = false }) => ($clickable ? "pointer" : "auto")};
`;

const BadgeContent = styled.div<{
  $closeable: boolean;
  $widthPixels?: number;
}>`
  display: flex;
  align-items: center;
  gap: 10px;

  width: ${({ $widthPixels }) => ($widthPixels ? `${$widthPixels}px` : "auto")};
  max-width: ${({ $closeable }) => ($closeable ? "calc(100% - 20px)" : "auto")};
`;

const IconContainer = styled.div<{ $iconSize?: string | number }>`
  display: flex;
  flex-direction: column;

  width: ${({ $iconSize = "auto" }) => $iconSize};
  min-width: ${({ $iconSize = "auto" }) => $iconSize};
  max-width: ${({ $iconSize = "auto" }) => $iconSize};
`;

const BadgeLabel = styled.div`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-weight: 500;

  ${HelperFontSize}
`;

type CloseButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const CloseButton = ({ onClick }: CloseButtonProps) => (
  <BaseCloseButton type="button" onClick={onClick}>
    <Icons.XIcon size={12} />
  </BaseCloseButton>
);

const BaseCloseButton = styled.button`
  display: flex;
  flex-direction: column;

  min-width: 12px;
`;
