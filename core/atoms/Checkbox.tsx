import { type DetailedHTMLProps, type InputHTMLAttributes } from "react";
import { LabelledInput } from "./shared";

type CheckboxProps = {
  label: string;
  labelBefore?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox = ({
  id,
  label,
  labelBefore = false,
  ...checkboxProps
}: CheckboxProps) => (
  <LabelledInput>
    {labelBefore ? <label htmlFor={`${id}-checkbox`}>{label}</label> : <></>}
    <input {...checkboxProps} id={`${id}-checkbox`} type="checkbox" />
    {labelBefore ? <></> : <label htmlFor={`${id}-checkbox`}>{label}</label>}
  </LabelledInput>
);

export default Checkbox;
