import styled from "styled-components";
import { InputValidation } from "./shared";
import { Colors } from "../foundations";

const Input = styled.input`
  padding: 12px 16px;
  background-color: ${Colors.base.white};
  border-radius: 6px;

  ${InputValidation}
`;

export default Input;
