import Link from "next/link";
import { ComponentType, HTMLAttributeAnchorTarget } from "react";
import styled from "styled-components";
import { Icons } from "../foundations";
import { ButtonStyle } from "./shared";

type LinkButtonProps = {
  text: string;
  href: string;
  disabled?: boolean;
  target?: HTMLAttributeAnchorTarget;
  LeftIcon?: ComponentType<Icons.IconProps>;
  RightIcon?: ComponentType<Icons.IconProps>;
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
  backgroundColor?: string;
  color?: string;
};

const Content = ({
  text,
  LeftIcon,
  RightIcon,
  backgroundColor,
  color,
}: ContentProps) => (
  <BaseLinkButton $backgroundColor={backgroundColor} $color={color}>
    {LeftIcon ? <LeftIcon color={color} size={20} /> : <></>}
    <p>{text}</p>
    {RightIcon ? <RightIcon color={color} size={20} /> : <></>}
  </BaseLinkButton>
);

const BaseLinkButton = styled.div<{
  $backgroundColor?: string;
  $color?: string;
}>`
  ${ButtonStyle}
`;
