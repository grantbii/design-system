"use client";

import { ComponentType, MouseEventHandler } from "react";
import { Icons } from "../foundations";
import { BaseButton as ButtonContent } from "./shared";
import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  LeftIcon?: ComponentType<Icons.IconProps>;
  RightIcon?: ComponentType<Icons.IconProps>;
  underline?: boolean;
  backgroundColor?: string;
  color?: string;
  width?: string;
};

const Button = ({
  text,
  onClick,
  disabled,
  LeftIcon,
  RightIcon,
  underline,
  backgroundColor,
  color,
  width,
  type = "button",
}: ButtonProps) => (
  <BaseButton type={type} onClick={onClick} disabled={disabled} $width={width}>
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
