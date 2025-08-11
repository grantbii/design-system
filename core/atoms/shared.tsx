import styled from "styled-components";
import { Colors } from "../foundations";

export const BaseButton = styled.div<{
  $underline?: boolean;
  $backgroundColor?: string;
  $color?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;
  border-radius: 4px;

  font-weight: 500;
  font-size: 14px;

  text-decoration: ${({ $underline = false }) =>
    $underline ? "underline" : "none"};

  color: ${({ $color = Colors.typography.whiteHigh }) => $color};
  background-color: ${({
    $underline = false,
    $backgroundColor = Colors.main.grantbiiBlue,
  }) => ($underline ? "transparent" : $backgroundColor)};
`;
