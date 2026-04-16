import type { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { Color } from "../atoms";
import { LabelledInput } from "../shared";

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
    <BaseCheckbox {...checkboxProps} id={`${id}-checkbox`} type="checkbox" />
    {label && !labelBefore ? <CheckboxLabel id={id} label={label} /> : <></>}
  </LabelledInput>
);

export default Checkbox;

const BaseCheckbox = styled.input`
  accent-color: ${Color.brand.grantbiiBlue};
`;

type CheckboxLabelProps = {
  id: string;
  label: ReactNode;
};

const CheckboxLabel = ({ id, label }: CheckboxLabelProps) => (
  <label htmlFor={`${id}-checkbox`}>{label}</label>
);
