import { JSX, MouseEventHandler } from "react";
import styled from "styled-components";
import { ButtonStyle } from "./shared";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  backgroundColor?: string;
  color?: string;
};

const Button = ({
  text,
  onClick,
  disabled,
  leftIcon,
  rightIcon,
  backgroundColor,
  color,
  type = "button",
}: ButtonProps) => (
  <button type={type} onClick={onClick} disabled={disabled}>
    <BaseButton $backgroundColor={backgroundColor} $color={color}>
      {leftIcon ? leftIcon : <></>}
      <p>{text}</p>
      {rightIcon ? rightIcon : <></>}
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
