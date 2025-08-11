import Link from "next/link";
import { ComponentType, HTMLAttributeAnchorTarget } from "react";
import { Icons } from "../foundations";
import { BaseButton } from "./shared";

type LinkButtonProps = {
  text: string;
  href: string;
  disabled?: boolean;
  target?: HTMLAttributeAnchorTarget;
  LeftIcon?: ComponentType<Icons.IconProps>;
  RightIcon?: ComponentType<Icons.IconProps>;
  underline?: boolean;
  backgroundColor?: string;
  color?: string;
};

const LinkButton = ({
  href,
  target,
  disabled,
  ...contentProps
}: LinkButtonProps) =>
  disabled ? (
    <Content {...contentProps} />
  ) : (
    <Link href={href} target={target}>
      <Content {...contentProps} />
    </Link>
  );

export default LinkButton;

type ContentProps = {
  text: string;
  LeftIcon?: ComponentType<Icons.IconProps>;
  RightIcon?: ComponentType<Icons.IconProps>;
  underline?: boolean;
  backgroundColor?: string;
  color?: string;
};

const Content = ({
  text,
  LeftIcon,
  RightIcon,
  underline,
  backgroundColor,
  color,
}: ContentProps) => (
  <BaseButton
    $underline={underline}
    $backgroundColor={backgroundColor}
    $color={color}
  >
    {LeftIcon ? <LeftIcon color={color} size={20} /> : <></>}
    <p>{text}</p>
    {RightIcon ? <RightIcon color={color} size={20} /> : <></>}
  </BaseButton>
);
