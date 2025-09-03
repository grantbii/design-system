import type { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { Select } from "../atoms";
import type { Option } from "../foundations";

type DropdownProps = {
  options: Option[];
  defaultLabel?: string;
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const Dropdown = ({
  options,
  defaultLabel,
  defaultValue = "",
  ...selectProps
}: DropdownProps) => (
  <Select {...selectProps} defaultValue={defaultValue}>
    <option hidden disabled value={defaultValue}>
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
