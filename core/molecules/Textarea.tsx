import styled from "styled-components";
import { Color } from "../atoms";
import { InputValidation, type InputValidationProps } from "../shared";

type TextareaProps = { $heightPixels?: number } & InputValidationProps;

const Textarea = styled.textarea<TextareaProps>`
  height: ${({ $heightPixels = 100 }) => $heightPixels}px;

  padding: 12px 16px;
  background-color: ${Color.neutral.white};
  border-radius: 8px;

  ${InputValidation}
`;

export default Textarea;
