import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from "react";
import styled, { css } from "styled-components";
import { Color, Spacing, SystemIcon, Typography } from "../atoms";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "text"
  | "danger";

type ButtonSize = "small" | "medium" | "large";

type CustomButtonProps = {
  label?: ReactNode;
  Icon?: SystemIcon.Icon;
  iconRight?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  target?: HTMLAttributeAnchorTarget;
  href?: string;
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
} & CustomButtonProps;

const Button = ({
  variant = "primary",
  size = "medium",
  ...restOfProps
}: ButtonProps) => {
  const variantProps = VARIANT_PROPS_MAP[variant];
  const sizeProps = SIZE_PROPS_MAP[size];

  return <RawButton {...variantProps} {...sizeProps} {...restOfProps} />;
};

export default Button;

type VariantStyleProps = {
  defaultColor: Color.DesignColor;
  hoverColor?: Color.DesignColor;
  disabledColor?: Color.DesignColor;
  defaultBackgroundColor: Color.DesignColor;
  hoverBackgroundColor?: Color.DesignColor;
  disabledBackgroundColor?: Color.DesignColor;
  borderColor?: Color.DesignColor;
  textDecoration?: string;
};

const VARIANT_PROPS_MAP: { [variant in ButtonVariant]: VariantStyleProps } = {
  primary: {
    defaultColor: Color.typography.whiteHigh,
    disabledColor: Color.typography.blackLow,
    defaultBackgroundColor: Color.brand.grantbiiBlue,
    hoverBackgroundColor: Color.accent.blue2,
    disabledBackgroundColor: Color.neutral.grey3,
  },
  secondary: {
    defaultColor: Color.typography.blackHigh,
    disabledColor: Color.typography.blackLow,
    defaultBackgroundColor: Color.brand.grantbiiYellow,
    hoverBackgroundColor: Color.accent.yellow2,
    disabledBackgroundColor: Color.neutral.grey3,
  },
  tertiary: {
    defaultColor: Color.typography.blackHigh,
    disabledColor: Color.typography.blackLow,
    defaultBackgroundColor: Color.neutral.grey3,
    hoverBackgroundColor: Color.accent.blue3,
    disabledBackgroundColor: Color.neutral.grey3,
  },
  outline: {
    defaultColor: Color.typography.blackHigh,
    disabledColor: Color.typography.blackLow,
    defaultBackgroundColor: "transparent",
    hoverBackgroundColor: Color.accent.blue3,
    borderColor: Color.neutral.grey2,
    disabledBackgroundColor: Color.neutral.grey3,
  },
  ghost: {
    defaultColor: Color.typography.blackHigh,
    disabledColor: Color.typography.blackLow,
    defaultBackgroundColor: "transparent",
    hoverBackgroundColor: Color.accent.blue3,
    disabledBackgroundColor: Color.neutral.grey3,
  },
  text: {
    defaultColor: Color.typography.blackHigh,
    hoverColor: Color.typography.blackMedium,
    disabledColor: Color.typography.blackLow,
    defaultBackgroundColor: "transparent",
    textDecoration: "underline",
  },
  danger: {
    defaultColor: Color.typography.whiteHigh,
    disabledColor: Color.typography.blackLow,
    defaultBackgroundColor: Color.accent.red1,
    hoverBackgroundColor: Color.accent.red2,
    disabledBackgroundColor: Color.neutral.grey3,
  },
};

type SizeStyleProps = {
  width?: string;
  height?: string;
  padding?: string;
  fontSize?: string;
};

const SIZE_PROPS_MAP: { [size in ButtonSize]: SizeStyleProps } = {
  small: {
    height: "40px",
    padding: `10px ${Spacing.px16}`, // not following spacing scale
    fontSize: "14px",
  },
  medium: {
    height: "46px",
    padding: `12px ${Spacing.px16}`, // not following spacing scale
    fontSize: "16px",
  },
  large: {
    height: "52px",
    padding: `14px ${Spacing.px16}`, // not following spacing scale
    fontSize: "18px",
  },
};

type RawButtonProps = CustomButtonProps & VariantStyleProps & SizeStyleProps;

export const RawButton = ({
  Icon,
  iconRight = false,
  label,
  href,
  target,
  disabled,
  type,
  width = "auto",
  height = "46px",
  padding = `12px ${Spacing.px16}`,
  fontSize = "16px",
  textDecoration = "none",
  defaultColor,
  hoverColor = defaultColor,
  disabledColor = defaultColor,
  defaultBackgroundColor,
  hoverBackgroundColor = defaultBackgroundColor,
  disabledBackgroundColor = defaultBackgroundColor,
  borderColor,
  ...restOfProps
}: RawButtonProps) => {
  const isActionIcon = !!Icon && !label;

  const styleProps: ButtonStyleProps = {
    $isActionIcon: isActionIcon,
    $width: width,
    $height: height,
    $padding: padding,
    $fontSize: fontSize,
    $textDecoration: textDecoration,
    $defaultColor: defaultColor,
    $hoverColor: hoverColor,
    $disabledColor: disabledColor,
    $defaultBackgroundColor: defaultBackgroundColor,
    $hoverBackgroundColor: hoverBackgroundColor,
    $disabledBackgroundColor: disabledBackgroundColor,
    $borderColor: borderColor,
  };

  const content = (
    <>
      {Icon && !iconRight && <Icon size={20} />}
      {label}
      {Icon && iconRight && <Icon size={20} />}
    </>
  );

  const isLink = !!href && !disabled;

  return isLink ? (
    <BaseLink {...restOfProps} {...styleProps} href={href} target={target}>
      {content}
    </BaseLink>
  ) : (
    <BaseButton
      {...restOfProps}
      {...styleProps}
      disabled={disabled}
      type={type}
    >
      {content}
    </BaseButton>
  );
};

type ButtonStyleProps = {
  $isActionIcon: boolean;
  $width: string;
  $height: string;
  $padding: string;
  $fontSize: string;
  $textDecoration: string;
  $defaultColor: Color.DesignColor;
  $hoverColor: Color.DesignColor;
  $disabledColor: Color.DesignColor;
  $defaultBackgroundColor: Color.DesignColor;
  $hoverBackgroundColor: Color.DesignColor;
  $disabledBackgroundColor: Color.DesignColor;
  $borderColor?: Color.DesignColor;
};

const ButtonStyle = css<ButtonStyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${Spacing.px8};

  box-sizing: border-box;
  width: ${(props) => (props.$isActionIcon ? props.$height : props.$width)};
  min-width: ${(props) => (props.$isActionIcon ? props.$height : "auto")};
  height: ${(props) => props.$height};
  padding: ${(props) => (props.$isActionIcon ? "0px" : props.$padding)};

  font-weight: ${Typography.weight.medium};
  font-size: ${(props) => props.$fontSize};
  white-space: nowrap;

  color: ${(props) => props.$defaultColor};
  background-color: ${(props) => props.$defaultBackgroundColor};

  border: ${(props) =>
    props.$borderColor ? `1px solid ${props.$borderColor}` : "none"};
  border-radius: ${Spacing.px8};

  text-decoration: ${(props) => props.$textDecoration};

  &:hover {
    color: ${(props) => props.$hoverColor};
    background-color: ${(props) => props.$hoverBackgroundColor};
  }

  &:disabled {
    color: ${(props) => props.$disabledColor};
    background-color: ${(props) => props.$disabledBackgroundColor};
  }
`;

const BaseLink = styled(Link)<ButtonStyleProps>`
  ${ButtonStyle}
`;

const BaseButton = styled.button<ButtonStyleProps>`
  ${ButtonStyle}
`;
