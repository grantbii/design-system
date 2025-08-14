import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

type RadioButtonProps = {
  label: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const RadioButton = ({ label, id, ...radioButtonProps }: RadioButtonProps) => (
  <BaseRadioButton>
    <input {...radioButtonProps} id={`${id}-radio-button`} type="radio" />
    <label htmlFor={`${id}-radio-button`}>{label}</label>
  </BaseRadioButton>
);

export default RadioButton;

const BaseRadioButton = styled.div`
  display: flex;
  gap: 8px;
`;
