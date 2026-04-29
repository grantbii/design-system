import type { ComponentType, MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { Color, Spacing, SystemIcon, Typography } from "../atoms";
import { applyTypography } from "../integrations";

type BadgeVariant = "default" | "neutral" | "blue" | "green" | "yellow" | "red";

type CustomBadgeProps = {
  label: ReactNode;
  Icon?: ComponentType<SystemIcon.IconProps>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onClickX?: MouseEventHandler<HTMLButtonElement>;
  labelWidthPixels?: number;
};

type BadgeProps = {
  variant?: BadgeVariant;
} & CustomBadgeProps;

const Badge = ({ variant = "default", ...restOfProps }: BadgeProps) => {
  const variantProps = VARIANT_PROPS_MAP[variant];
  return <RawBadge {...variantProps} {...restOfProps} />;
};

export default Badge;

type VariantStyleProps = {
  color: Color.DesignColor;
  defaultBackgroundColor: Color.DesignColor;
  hoverBackgroundColor?: Color.DesignColor;
};

const VARIANT_PROPS_MAP: { [variant in BadgeVariant]: VariantStyleProps } = {
  default: {
    color: Color.typography.blackHigh,
    defaultBackgroundColor: Color.accent.blue3,
    hoverBackgroundColor: Color.accent.blue4,
  },
  neutral: {
    color: Color.typography.blackHigh,
    defaultBackgroundColor: Color.neutral.grey4,
    hoverBackgroundColor: Color.neutral.grey3,
  },
  blue: {
    color: Color.accent.blue1,
    defaultBackgroundColor: Color.accent.blue3,
    hoverBackgroundColor: Color.accent.blue4,
  },
  green: {
    color: Color.accent.green1,
    defaultBackgroundColor: Color.accent.green3,
    hoverBackgroundColor: Color.accent.green4,
  },
  yellow: {
    color: Color.accent.yellow1,
    defaultBackgroundColor: Color.accent.yellow3,
    hoverBackgroundColor: Color.accent.yellow4,
  },
  red: {
    color: Color.accent.red1,
    defaultBackgroundColor: Color.accent.red3,
    hoverBackgroundColor: Color.accent.red4,
  },
};

type RawBadgeProps = CustomBadgeProps & VariantStyleProps;

export const RawBadge = ({
  label,
  Icon,
  onClick,
  onClickX,
  labelWidthPixels,
  defaultBackgroundColor,
  hoverBackgroundColor = defaultBackgroundColor,
  color,
}: RawBadgeProps) => (
  <BaseBadge
    onClick={onClick}
    $isClickable={!!onClick}
    $defaultBackgroundColor={defaultBackgroundColor}
    $hoverBackgroundColor={hoverBackgroundColor}
    $color={color}
  >
    <BadgeContent $hasX={!!onClickX} $widthPixels={labelWidthPixels}>
      {Icon ? (
        <IconContainer>
          <Icon color={color} size={12} />
        </IconContainer>
      ) : (
        <></>
      )}

      <BadgeLabel>{label}</BadgeLabel>
    </BadgeContent>

    {onClickX ? <XButton onClick={onClickX} /> : <></>}
  </BaseBadge>
);

const BaseBadge = styled.div<{
  $isClickable: boolean;
  $defaultBackgroundColor: Color.DesignColor;
  $hoverBackgroundColor: Color.DesignColor;
  $color: Color.DesignColor;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  height: 26px;
  padding: 5px ${Spacing.px12};
  border-radius: 100px;

  font-size: 12px;
  font-weight: ${Typography.weight.medium};

  color: ${(props) => props.$color};
  background-color: ${(props) => props.$defaultBackgroundColor};

  cursor: ${(props) => (props.$isClickable ? "pointer" : "auto")};

  &:hover {
    background-color: ${(props) =>
      props.$isClickable
        ? props.$hoverBackgroundColor
        : props.$defaultBackgroundColor};
  }
`;

const BadgeContent = styled.div<{
  $hasX: boolean;
  $widthPixels?: number;
}>`
  display: flex;
  align-items: center;
  gap: 10px;

  width: ${({ $widthPixels }) => ($widthPixels ? `${$widthPixels}px` : "auto")};
  max-width: ${({ $hasX: $closeable }) =>
    $closeable ? "calc(100% - 20px)" : "auto"};
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

  ${applyTypography(Typography.bodySecondaryMedium)}
`;

type XButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const XButton = ({ onClick }: XButtonProps) => (
  <BaseCloseButton type="button" onClick={onClick}>
    <SystemIcon.XIcon color={Color.typography.blackMedium} size={12} />
  </BaseCloseButton>
);

const BaseCloseButton = styled.button`
  display: flex;
  flex-direction: column;

  min-width: 12px;
`;
