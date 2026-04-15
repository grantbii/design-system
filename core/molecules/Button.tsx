import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import styled from "styled-components";
import { Icons } from "../atoms";
import { BaseButton as ButtonContent } from "../shared";

type ButtonProps = {
  label: ReactNode;
  LeftIcon?: Icons.Icon;
  RightIcon?: Icons.Icon;
  underline?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  width?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  label,
  LeftIcon,
  RightIcon,
  underline,
  backgroundColor,
  borderColor,
  color,
  width,
  type = "button",
  ...buttonProps
}: ButtonProps) => (
  <BaseButton {...buttonProps} type={type} $width={width}>
    <ButtonContent
      $underline={underline}
      $backgroundColor={backgroundColor}
      $borderColor={borderColor}
      $color={color}
      $width={width}
    >
      {LeftIcon ? <LeftIcon color={color} size={20} /> : <></>}
      {label}
      {RightIcon ? <RightIcon color={color} size={20} /> : <></>}
    </ButtonContent>
  </BaseButton>
);

export default Button;

const BaseButton = styled.button<{ $width?: string }>`
  width: ${({ $width = "auto" }) => $width};
`;
