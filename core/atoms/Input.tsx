import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { Colors, type Option } from "../foundations";
import { InputValidation } from "./shared";

type InputProps = {
  datalistId?: string;
  datalistOptions?: Option[];
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({ datalistOptions, datalistId, ...inputProps }: InputProps) => (
  <>
    <BaseInput {...inputProps} list={datalistId} />

    {datalistId && datalistOptions ? (
      <Datalist id={datalistId} options={datalistOptions} />
    ) : (
      <></>
    )}
  </>
);

export default Input;

const BaseInput = styled.input`
  padding: 12px 16px;
  background-color: ${Colors.base.white};
  border-radius: 8px;

  ${InputValidation}
`;

type DatalistProps = {
  id: string;
  options: Option[];
};

const Datalist = ({ id, options }: DatalistProps) => (
  <datalist id={id}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </datalist>
);
