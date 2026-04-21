import styled, { css } from "styled-components";
import { Color, SystemIcon } from "./atoms";

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
