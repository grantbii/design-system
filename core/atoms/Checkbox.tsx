import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { LabelInput } from "./shared";

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
  <LabelInput>
    {labelBefore ? <label htmlFor={`${id}-checkbox`}>{label}</label> : <></>}
    <input {...checkboxProps} id={`${id}-checkbox`} type="checkbox" />
    {labelBefore ? <></> : <label htmlFor={`${id}-checkbox`}>{label}</label>}
  </LabelInput>
);

export default Checkbox;
