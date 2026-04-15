import styled, { css } from "styled-components";
import { Colors, Icons } from "./foundations";

export const BaseButton = styled.div<{
  $underline?: boolean;
  $backgroundColor?: string;
  $borderColor?: string;
  $color?: string;
  $width?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: ${({ $width = "auto" }) => $width};

  padding: 10px 16px;

  font-weight: 500;
  font-size: 14px;

  white-space: nowrap;
  text-decoration: ${({ $underline = false }) =>
    $underline ? "underline" : "none"};

  color: ${({ $color = Colors.typography.whiteHigh }) => $color};
  background-color: ${({
    $underline = false,
    $backgroundColor = Colors.main.grantbiiBlue,
  }) => ($underline ? "transparent" : $backgroundColor)};

  border: 1px solid ${({ $borderColor = "transparent" }) => $borderColor};
  border-radius: 8px;
`;

export const LabelledInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export type InputValidationProps = {
  $hasError?: boolean;
};

export const InputValidation = css<InputValidationProps>`
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

  ${({ $hasError = false }) =>
    $hasError
      ? css`
          &:valid {
            background-color: ${Colors.base.white};
            border: 1px solid ${Colors.accent.red1};
            outline: none;
          }

          &:valid&:focus {
            background-color: ${Colors.base.white};
            border: 1px solid ${Colors.accent.red1};
            outline: 1px solid ${Colors.accent.red1};
          }
        `
      : css``}
`;

export const FILE_TYPE_ICON_MAP: { [mimeType: string]: Icons.Icon } = {
  "application/pdf": Icons.FilePdfIcon,
  "image/png": Icons.FilePngIcon,
  "image/jpeg": Icons.FileJpgIcon,
};
