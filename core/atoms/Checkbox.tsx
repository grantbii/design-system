import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { LabelledInput } from "./shared";

type CheckboxProps = {
  id: string;
  label: ReactNode;
  labelBefore?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox = ({
  id,
  label,
  labelBefore = false,
  ...checkboxProps
}: CheckboxProps) => (
  <LabelledInput>
    {label && labelBefore ? <CheckboxLabel id={id} label={label} /> : <></>}
    <input {...checkboxProps} id={`${id}-checkbox`} type="checkbox" />
    {label && !labelBefore ? <CheckboxLabel id={id} label={label} /> : <></>}
  </LabelledInput>
);

export default Checkbox;

type CheckboxLabelProps = {
  id: string;
  label: ReactNode;
};

const CheckboxLabel = ({ id, label }: CheckboxLabelProps) => (
  <label htmlFor={`${id}-checkbox`}>{label}</label>
);
