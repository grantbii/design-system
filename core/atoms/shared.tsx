import styled, { css } from "styled-components";
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

export const LabelledInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputValidation = css`
  &:disabled {
    background-color: ${Colors.neutral.grey4};
    border: 1px solid ${Colors.neutral.grey3};
    outline: none;
  }

  &:valid {
    background-color: ${Colors.base.white};
    border: 1px solid ${Colors.neutral.grey3};
    outline: none;
  }

  &:valid&:focus {
    background-color: ${Colors.base.white};
    border: 1px solid ${Colors.accent.blue1};
    outline: 1px solid ${Colors.accent.blue1};
  }

  &:invalid {
    background-color: ${Colors.base.white};
    border: 1px solid ${Colors.accent.red1};
    outline: none;
  }

  &:invalid&:focus {
    background-color: ${Colors.base.white};
    border: 1px solid ${Colors.accent.red1};
    outline: 1px solid ${Colors.accent.red1};
  }
`;
