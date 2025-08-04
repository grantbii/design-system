import { ComponentType, MouseEventHandler } from "react";
import styled from "styled-components";
import { Icons } from "../foundations";
import { ButtonStyle } from "./shared";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  LeftIcon?: ComponentType<Icons.IconProps>;
  RightIcon?: ComponentType<Icons.IconProps>;
  backgroundColor?: string;
  color?: string;
};

const Button = ({
  text,
  onClick,
  disabled,
  LeftIcon,
  RightIcon,
  backgroundColor,
  color,
  type = "button",
}: ButtonProps) => (
  <button type={type} onClick={onClick} disabled={disabled}>
    <BaseButton $backgroundColor={backgroundColor} $color={color}>
      {LeftIcon ? <LeftIcon color={color} size={20} /> : <></>}
      <p>{text}</p>
      {RightIcon ? <RightIcon color={color} size={20} /> : <></>}
    </BaseButton>
  </button>
);

export default Button;

const BaseButton = styled.div<{
  $backgroundColor?: string;
  $color?: string;
}>`
  ${ButtonStyle}
`;
