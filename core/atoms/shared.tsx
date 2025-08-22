import styled from "styled-components";
import { Colors } from "../foundations";

export const BaseButton = styled.div<{
  $underline?: boolean;
  $backgroundColor?: string;
  $color?: string;
  $width?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: ${({ $width = "auto" }) => $width};

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

export const LabelInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
