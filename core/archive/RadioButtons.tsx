import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { RadioButton } from "../molecules";
import type { Option } from "../types";

export type RadioOption = Option &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type RadioButtonProps = {
  name?: string;
  options: RadioOption[];
};

const RadioButtons = ({ name, options }: RadioButtonProps) => (
  <RadioGroup>
    {options.map(({ id, value, ...props }) => (
      <RadioButton
        {...props}
        key={`${name}-${value}`}
        id={id ? id : value} // assume mutually exclusive values
        value={value}
        name={name}
      />
    ))}
  </RadioGroup>
);

export default RadioButtons;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  white-space: nowrap;
  flex-wrap: wrap;
`;
