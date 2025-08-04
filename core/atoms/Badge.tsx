import { ComponentType, MouseEventHandler } from "react";
import styled from "styled-components";
import { Colors, Icons } from "../foundations";

type BadgeProps = {
  text: string;
  Icon?: ComponentType<Icons.IconProps>;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
  textWidthPixels?: number;
  backgroundColor?: string;
  color?: string;
};

const Badge = ({
  Icon,
  text,
  onClickClose,
  textWidthPixels,
  backgroundColor,
  color,
}: BadgeProps) => (
  <BaseBadge $backgroundColor={backgroundColor} $color={color}>
    {Icon ? <Icon color={color} size={20} /> : <></>}
    <BadgeText $widthPixels={textWidthPixels}>{text}</BadgeText>

    {onClickClose ? (
      <Button type="button" onClick={onClickClose}>
        <Icons.XIcon size={12} />
      </Button>
    ) : (
      <></>
    )}
  </BaseBadge>
);

export default Badge;

const BaseBadge = styled.div<{ $backgroundColor?: string; $color?: string }>`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 5px 16px;
  border-radius: 130px;

  color: ${({ $color = Colors.typography.blackHigh }) => $color};
  background-color: ${({ $backgroundColor = Colors.neutral.grey3 }) =>
    $backgroundColor};
`;

const BadgeText = styled.p<{ $widthPixels?: number }>`
  width: ${({ $widthPixels }) => ($widthPixels ? `${$widthPixels}px` : "auto")};
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  font-weight: 500;
  font-size: 14px;
`;

const Button = styled.button`
  display: flex;
`;
