import styled from "styled-components";
import { Colors } from "../foundations";
import { InputValidation } from "./shared";

const Textarea = styled.textarea<{ $heightPixels?: number }>`
  height: ${({ $heightPixels = 100 }) => $heightPixels}px;

  padding: 12px 16px;
  background-color: ${Colors.base.white};
  border-radius: 8px;

  ${InputValidation}
`;

export default Textarea;
