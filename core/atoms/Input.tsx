import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { Colors, Icons, type Option } from "../foundations";
import { InputValidation, type InputValidationProps } from "./shared";

type InputProps = {
  LeftIcon?: Icons.Icon;
  RightIcon?: Icons.Icon;
  iconColor?: string;
  datalistId?: string;
  datalistOptions?: Option[];
} & InputValidationProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({
  LeftIcon,
  RightIcon,
  iconColor,
  datalistOptions,
  datalistId,
  ...inputProps
}: InputProps) => (
  <>
    {LeftIcon ? (
      <LeftIcon
        color={iconColor}
        size={20}
        style={{ position: "relative", left: 28, top: 4 }}
      />
    ) : (
      <></>
    )}

    <BaseInput
      {...inputProps}
      list={datalistId}
      $hasLeftIcon={!!LeftIcon}
      $hasRightIcon={!!RightIcon}
    />

    {RightIcon ? (
      <RightIcon
        color={iconColor}
        size={20}
        style={{ position: "relative", right: 28, top: 4 }}
      />
    ) : (
      <></>
    )}

    {datalistId && datalistOptions ? (
      <Datalist id={datalistId} options={datalistOptions} />
    ) : (
      <></>
    )}
  </>
);

export default Input;

type BaseInputProps = {
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
} & InputValidationProps;

const BaseInput = styled.input<BaseInputProps>`
  padding: ${({ $hasLeftIcon, $hasRightIcon }) =>
    `12px ${$hasRightIcon ? "32px" : "16px"} 12px ${$hasLeftIcon ? "32px" : "16px"}`};
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
