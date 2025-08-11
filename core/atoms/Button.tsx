import { ComponentType, MouseEventHandler } from "react";
import { Icons } from "../foundations";
import { BaseButton } from "./shared";

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
  type = "button",
}: ButtonProps) => (
  <button type={type} onClick={onClick} disabled={disabled}>
    <BaseButton
      $underline={underline}
      $backgroundColor={backgroundColor}
      $color={color}
    >
      {LeftIcon ? <LeftIcon color={color} size={20} /> : <></>}
      <p>{text}</p>
      {RightIcon ? <RightIcon color={color} size={20} /> : <></>}
    </BaseButton>
  </button>
);

export default Button;
