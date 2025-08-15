import { LogicOption } from "@grantbii/ui-base/grant/enums";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { RadioButton } from "../atoms";

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
      id={`${name}-yes`}
      label={LogicOption.YES}
      value={LogicOption.YES}
      name={name}
    />
    <RadioButton
      {...noProps}
      id={`${name}-no`}
      label={LogicOption.NO}
      value={LogicOption.NO}
      name={name}
    />
    {unsureProps ? (
      <RadioButton
        {...unsureProps}
        id={`${name}-unsure`}
        label={LogicOption.UNSURE}
        value={LogicOption.UNSURE}
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
