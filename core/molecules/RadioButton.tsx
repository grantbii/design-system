import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import type { Option } from "../types";
import { LabelledInput } from "../shared";

type RadioButtonProps = Option &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const RadioButton = ({
  label,
  value,
  id = value,
  ...radioButtonProps
}: RadioButtonProps) => (
  <LabelledInput>
    <input
      {...radioButtonProps}
      value={value}
      id={`${id}-radio-button`}
      type="radio"
    />
    <label htmlFor={`${id}-radio-button`}>{label}</label>
  </LabelledInput>
);

export default RadioButton;
