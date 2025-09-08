import type {
  ButtonHTMLAttributes,
  ComponentType,
  DetailedHTMLProps,
} from "react";
import styled from "styled-components";
import { Icons } from "../foundations";
import { BaseButton as ButtonContent } from "./shared";

type ButtonProps = {
  text: string;
  LeftIcon?: ComponentType<Icons.IconProps>;
  RightIcon?: ComponentType<Icons.IconProps>;
  underline?: boolean;
  backgroundColor?: string;
  color?: string;
  width?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  text,
  LeftIcon,
  RightIcon,
  underline,
  backgroundColor,
  color,
  width,
  type = "button",
  ...buttonProps
}: ButtonProps) => (
  <BaseButton {...buttonProps} type={type} $width={width}>
    <ButtonContent
      $underline={underline}
      $backgroundColor={backgroundColor}
      $color={color}
      $width={width}
    >
      {LeftIcon ? <LeftIcon color={color} size={20} /> : <></>}
      <p>{text}</p>
      {RightIcon ? <RightIcon color={color} size={20} /> : <></>}
    </ButtonContent>
  </BaseButton>
);

export default Button;

const BaseButton = styled.button<{ $width?: string }>`
  width: ${({ $width = "auto" }) => $width};
`;
