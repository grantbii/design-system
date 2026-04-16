import type { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import styled from "styled-components";
import { Color } from "../atoms";
import { InputValidation, type InputValidationProps } from "../shared";
import { type Option } from "../types";

export type DropdownProps = {
  options: Option[];
  defaultLabel?: string;
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const Dropdown = ({ options, defaultLabel, ...selectProps }: DropdownProps) => (
  <Select {...selectProps}>
    <option hidden disabled value="">
      {defaultLabel ? defaultLabel : "-"}
    </option>

    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Select>
);

export default Dropdown;

const Select = styled.select<InputValidationProps>`
  padding: 12px 16px;
  background-color: ${Color.neutral.white};
  border-radius: 8px;

  ${InputValidation}
`;
