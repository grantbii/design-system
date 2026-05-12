import type {
  ComponentPropsWithoutRef,
  DetailedHTMLProps,
  SelectHTMLAttributes,
} from "react";
import styled from "styled-components";
import { Color, Typography } from "../atoms";
import { type Option } from "../types";

type DropdownOption = Option &
  Omit<ComponentPropsWithoutRef<"option">, keyof Option | "children">;

export type DropdownProps = {
  options: DropdownOption[];
  defaultLabel?: string;
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const Dropdown = ({ options, defaultLabel, ...selectProps }: DropdownProps) => (
  <Select {...selectProps}>
    <option hidden disabled value="">
      {defaultLabel ?? "-"}
    </option>

    {options.map(({ label, ...optionProps }) => (
      <option key={optionProps.value} {...optionProps}>
        {label}
      </option>
    ))}
  </Select>
);

export default Dropdown;

const Select = styled.select`
  padding: 12px 16px;
  border-radius: 8px;

  font-size: 16px;
  font-weight: ${Typography.weight.medium};

  background-color: transparent;
  border: 1px solid ${Color.neutral.grey2};

  &:active {
    background-color: ${Color.accent.blue3};
  }
`;
