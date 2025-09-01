import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { LabelledInput } from "./shared";

type RadioButtonProps = {
  label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const RadioButton = ({ id, label, ...radioButtonProps }: RadioButtonProps) => (
  <LabelledInput>
    <input {...radioButtonProps} id={`${id}-radio-button`} type="radio" />
    <label htmlFor={`${id}-radio-button`}>{label}</label>
  </LabelledInput>
);

export default RadioButton;
