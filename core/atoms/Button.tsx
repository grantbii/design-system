import { JSX, MouseEventHandler } from "react";
import styled from "styled-components";
import { Colors } from "../foundations";

type ButtonProps = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  backgroundColor?: string;
  color?: string;
};

const Button = ({
  text,
  onClick,
  leftIcon,
  rightIcon,
  backgroundColor,
  color,
  type = "button",
}: ButtonProps) => (
  <button type={type} onClick={onClick}>
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
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;
  border-radius: 4px;

  font-weight: 500;
  font-size: 14px;

  color: ${({ $color = Colors.typography.whiteHigh }) => $color};
  background-color: ${({ $backgroundColor = Colors.main.grantbiiBlue }) =>
    $backgroundColor};
`;
