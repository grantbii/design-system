import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { LabelInput } from "./shared";

type RadioButtonProps = {
  label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const RadioButton = ({ id, label, ...radioButtonProps }: RadioButtonProps) => (
  <LabelInput>
    <input {...radioButtonProps} id={`${id}-radio-button`} type="radio" />
    <label htmlFor={`${id}-radio-button`}>{label}</label>
  </LabelInput>
);

export default RadioButton;
