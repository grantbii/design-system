import { LogicValue } from "@grantbii/ui-core/grant/enums";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { RadioButton } from "../molecules";

type YesNoOptionsProps = {
  name: string;
  yesProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  noProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  unsureProps?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const YesNoOptions = ({
  name,
  yesProps,
  noProps,
  unsureProps,
}: YesNoOptionsProps) => (
  <RadioGroup>
    <RadioButton
      {...yesProps}
      label={LogicValue.YES}
      value={LogicValue.YES}
      name={name}
    />
    <RadioButton
      {...noProps}
      label={LogicValue.NO}
      value={LogicValue.NO}
      name={name}
    />
    {unsureProps ? (
      <RadioButton
        {...unsureProps}
        label={LogicValue.UNSURE}
        value={LogicValue.UNSURE}
        name={name}
      />
    ) : (
      <></>
    )}
  </RadioGroup>
);

export default YesNoOptions;

const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
`;
