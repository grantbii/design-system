import type { ComponentType, MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { Colors, Icons, Responsive, Typography } from "../foundations";

export type BadgeProps = {
  label: ReactNode;
  Icon?: ComponentType<Icons.IconProps>;
  iconSize?: string | number;
  iconWeight?: Icons.IconWeight;
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
  onClickClose,
  labelWidthPixels,
  backgroundColor,
  color,
}: BadgeProps) => (
  <BaseBadge $backgroundColor={backgroundColor} $color={color}>
    <BadgeContent $isCloseable={!!onClickClose} $widthPixels={labelWidthPixels}>
      {Icon ? (
        <IconContainer>
          <Icon color={color} size={iconSize} weight={iconWeight} />
        </IconContainer>
      ) : (
        <></>
      )}

      <BadgeLabel>{label}</BadgeLabel>
    </BadgeContent>

    {onClickClose ? (
      <Button type="button" onClick={onClickClose}>
        <Icons.XIcon size={12} />
      </Button>
    ) : (
      <></>
    )}
  </BaseBadge>
);

export default Badge;

const BaseBadge = styled.div<{ $backgroundColor?: string; $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 5px 16px;
  border-radius: 120px;

  color: ${({ $color = Colors.typography.blackHigh }) => $color};
  background-color: ${({ $backgroundColor = Colors.neutral.grey3 }) =>
    $backgroundColor};
`;

const BadgeContent = styled.div<{
  $isCloseable: boolean;
  $widthPixels?: number;
}>`
  display: flex;
  align-items: center;
  gap: 10px;

  width: ${({ $widthPixels }) => ($widthPixels ? `${$widthPixels}px` : "auto")};
  max-width: ${({ $isCloseable }) =>
    $isCloseable ? "calc(100% - 20px)" : "auto"};
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

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.HELPER_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.HELPER_FONT_SIZES.big};
  }
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;

  min-width: 12px;
`;
