import Link from "next/link";
import { HTMLAttributeAnchorTarget, JSX } from "react";
import styled from "styled-components";
import { ButtonStyle } from "./shared";

type LinkButtonProps = {
  text: string;
  href: string;
  disabled?: boolean;
  target?: HTMLAttributeAnchorTarget;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
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
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  backgroundColor?: string;
  color?: string;
};

const Content = ({
  text,
  leftIcon,
  rightIcon,
  backgroundColor,
  color,
}: ContentProps) => (
  <BaseLinkButton $backgroundColor={backgroundColor} $color={color}>
    {leftIcon ? leftIcon : <></>}
    <p>{text}</p>
    {rightIcon ? rightIcon : <></>}
  </BaseLinkButton>
);

const BaseLinkButton = styled.div<{
  $backgroundColor?: string;
  $color?: string;
}>`
  ${ButtonStyle}
`;
