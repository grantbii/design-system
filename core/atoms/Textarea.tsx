import styled from "styled-components";
import { Colors } from "../foundations";

const Textarea = styled.textarea<{ $heightPixels?: number }>`
  height: ${({ $heightPixels = 100 }) => $heightPixels}px;
  padding: 12px 16px;
  border-radius: 6px;

  &:disabled {
    background-color: ${Colors.neutral.grey4};
    border: 1px solid ${Colors.neutral.grey3};
  }

  &:valid {
    border: 1px solid ${Colors.neutral.grey3};
  }

  &:invalid {
    border: 1px solid ${Colors.accent.red1};
  }

  &:focus&:valid {
    border: 1px solid ${Colors.accent.blue1};
    outline: 1px solid ${Colors.accent.blue1};
  }

  &:focus&:invalid {
    border: 1px solid ${Colors.accent.red1};
    outline: 1px solid ${Colors.accent.red1};
  }
`;

export default Textarea;
