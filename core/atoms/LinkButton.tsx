import Link from "next/link";
import { HTMLAttributeAnchorTarget, JSX } from "react";
import styled from "styled-components";
import { ButtonStyle } from "./shared";

type LinkButtonProps = {
  text: string;
  href: string;
  target?: HTMLAttributeAnchorTarget;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  backgroundColor?: string;
  color?: string;
};

const LinkButton = ({
  text,
  href,
  target,
  leftIcon,
  rightIcon,
  backgroundColor,
  color,
}: LinkButtonProps) => (
  <Link href={href} target={target}>
    <BaseLinkButton $backgroundColor={backgroundColor} $color={color}>
      {leftIcon ? leftIcon : <></>}
      <p>{text}</p>
      {rightIcon ? rightIcon : <></>}
    </BaseLinkButton>
  </Link>
);

export default LinkButton;

const BaseLinkButton = styled.div<{
  $backgroundColor?: string;
  $color?: string;
}>`
  ${ButtonStyle}
`;
