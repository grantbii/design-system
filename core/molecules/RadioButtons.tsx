import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { RadioButton } from "../atoms";
import { Option } from "../foundations";

type RadioButtonProps = {
  options: Option[];
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const RadioButtons = ({
  options,
  name,
  ...radioButtonProps
}: RadioButtonProps) => {
  return (
    <RadioGroup>
      {options.map(({ label, value }) => (
        <RadioButton
          {...radioButtonProps}
          key={`${name}-radio-button`}
          id={`${name}-radio-button`}
          name={name}
          label={label}
          value={value}
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
