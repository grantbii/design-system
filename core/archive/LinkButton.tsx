import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ComponentType,
  DetailedHTMLProps,
  HTMLAttributeAnchorTarget,
  ReactNode,
} from "react";
import { Icons } from "../foundations";
import { BaseButton } from "../shared";

type LinkButtonProps = {
  label: ReactNode;
  href: string;
  disabled?: boolean;
  target?: HTMLAttributeAnchorTarget;
  LeftIcon?: ComponentType<Icons.IconProps>;
  RightIcon?: ComponentType<Icons.IconProps>;
  underline?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  width?: string;
} & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

/**
 * A link that looks like a button
 */
const LinkButton = ({
  label,
  LeftIcon,
  RightIcon,
  underline,
  backgroundColor,
  borderColor,
  color,
  width,
  disabled,
  target = "_blank",
  ...linkProps
}: LinkButtonProps) => {
  const contentProps = {
    label,
    LeftIcon,
    RightIcon,
    underline,
    backgroundColor,
    borderColor,
    color,
    width,
  };

  return disabled ? (
    <Content {...contentProps} />
  ) : (
    <Link {...linkProps} target={target}>
      <Content {...contentProps} />
    </Link>
  );
};

export default LinkButton;

type ContentProps = {
  label: ReactNode;
  LeftIcon?: ComponentType<Icons.IconProps>;
  RightIcon?: ComponentType<Icons.IconProps>;
  underline?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  width?: string;
};

const Content = ({
  label,
  LeftIcon,
  RightIcon,
  underline,
  backgroundColor,
  borderColor,
  color,
  width,
}: ContentProps) => (
  <BaseButton
    $underline={underline}
    $backgroundColor={backgroundColor}
    $borderColor={borderColor}
    $color={color}
    $width={width}
  >
    {LeftIcon ? <LeftIcon color={color} size={20} /> : <></>}
    {label}
    {RightIcon ? <RightIcon color={color} size={20} /> : <></>}
  </BaseButton>
);
