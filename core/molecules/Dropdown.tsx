import type { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { Select } from "../atoms";
import type { Option } from "../foundations";

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
