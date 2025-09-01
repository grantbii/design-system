import styled from "styled-components";
import { Colors } from "../foundations";
import { InputValidation } from "./shared";

const Select = styled.select`
  padding: 12px 16px;
  background-color: ${Colors.base.white};
  border-radius: 6px;

  ${InputValidation}
`;

export default Select;
