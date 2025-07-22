import { JSX, MouseEventHandler } from "react";
import styled from "styled-components";
import { Colors, Icons } from "../../index";

type BadgeProps = {
  text: string;
  icon?: JSX.Element;
  onClickClose?: MouseEventHandler<HTMLButtonElement>;
  backgroundColor?: string;
  color?: string;
};

const Badge = ({
  icon,
  text,
  onClickClose,
  backgroundColor = Colors.neutral.grey3,
  color = Colors.typography.blackHigh,
}: BadgeProps) => (
  <BaseBadge $backgroundColor={backgroundColor} $color={color}>
    {icon ? icon : <></>}
    {text ? <BadgeText>{text}</BadgeText> : <></>}
    {onClickClose ? (
      <Button type="button" onClick={onClickClose}>
        <Icons.XIcon size={20} />
      </Button>
    ) : (
      <></>
    )}
  </BaseBadge>
);

export default Badge;

const BaseBadge = styled.div<{ $backgroundColor: string; $color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 5px 16px;
  border-radius: 130px;

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $color }) => $color};
`;

const BadgeText = styled.p`
  font-weight: 500;
  font-size: 14px;
`;

const Button = styled.button`
  display: flex;
`;
