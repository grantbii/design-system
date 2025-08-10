import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { RadioButton } from "../atoms";
import { Option } from "../foundations";

type RadioOption = Option &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type RadioButtonProps = {
  name: string;
  options: RadioOption[];
};

const RadioButtons = ({ name, options }: RadioButtonProps) => {
  return (
    <RadioGroup>
      {options.map(({ value, ...props }) => (
        <RadioButton
          {...props}
          key={`${value}-radio-button`}
          id={`${value}-radio-button`}
          value={value}
          name={name}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioButtons;

const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
`;
