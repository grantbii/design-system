import styled, { css } from "styled-components";
import { Color, SystemIcon } from "./atoms";

// TODO: refactor away

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

  color: ${({ $color = Color.typography.whiteHigh }) => $color};
  background-color: ${({
    $underline = false,
    $backgroundColor = Color.brand.grantbiiBlue,
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
    background-color: ${Color.neutral.grey4};
    border: 1px solid ${Color.neutral.grey3};
    outline: none;
  }

  &:valid {
    background-color: ${Color.neutral.white};
    border: 1px solid ${Color.neutral.grey3};
    outline: none;
  }

  &:valid&:focus {
    background-color: ${Color.neutral.white};
    border: 1px solid ${Color.accent.blue1};
    outline: 1px solid ${Color.accent.blue1};
  }

  &:invalid {
    background-color: ${Color.neutral.white};
    border: 1px solid ${Color.accent.red1};
    outline: none;
  }

  &:invalid&:focus {
    background-color: ${Color.neutral.white};
    border: 1px solid ${Color.accent.red1};
    outline: 1px solid ${Color.accent.red1};
  }

  ${({ $hasError = false }) =>
    $hasError
      ? css`
          &:valid {
            background-color: ${Color.neutral.white};
            border: 1px solid ${Color.accent.red1};
            outline: none;
          }

          &:valid&:focus {
            background-color: ${Color.neutral.white};
            border: 1px solid ${Color.accent.red1};
            outline: 1px solid ${Color.accent.red1};
          }
        `
      : css``}
`;

export const FILE_TYPE_ICON_MAP: { [mimeType: string]: SystemIcon.Icon } = {
  "application/pdf": SystemIcon.FilePdfIcon,
  "image/png": SystemIcon.FilePngIcon,
  "image/jpeg": SystemIcon.FileJpgIcon,
};
