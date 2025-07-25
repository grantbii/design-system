import Link from "next/link";
import { HTMLAttributeAnchorTarget, JSX } from "react";
import styled from "styled-components";
import { Colors } from "../../index";

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
  display: flex;
  gap: 10px;

  padding: 10px 16px;
  border-radius: 4px;

  font-weight: 500;
  font-size: 14px;

  color: ${({ $color = Colors.typography.whiteHigh }) => $color};
  background-color: ${({ $backgroundColor = Colors.main.grantbiiBlue }) =>
    $backgroundColor};
`;
