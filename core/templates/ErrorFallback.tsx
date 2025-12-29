import Image from "next/image";
import type { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import errorLogo from "../assets/logos/error_logo.webp";
import { Button } from "../atoms";
import { Colors, Responsive } from "../foundations";
import { BodyFontSize, SubheaderFontSize } from "../integrations";

type ErrorFallbackProps = {
  errorMessage?: string;
  errorDescription: ReactNode;
  onClickReload?: MouseEventHandler<HTMLButtonElement>;
};

const ErrorFallback = ({
  errorMessage = DEFAULT_ERROR_MESSAGE,
  errorDescription,
  onClickReload,
}: ErrorFallbackProps) => (
  <BaseErrorFallback>
    <ErrorLogo src={errorLogo} width={693} height={641} alt={errorMessage} />

    <ErrorText
      errorMessage={errorMessage}
      errorDescription={errorDescription}
    />

    {onClickReload ? (
      <Button
        label="Try Again"
        onClick={onClickReload}
        backgroundColor={Colors.base.white}
        borderColor={Colors.neutral.grey3}
        color={Colors.typography.blackHigh}
      />
    ) : (
      <></>
    )}
  </BaseErrorFallback>
);

export default ErrorFallback;

const DEFAULT_ERROR_MESSAGE = "Something went wrong";

const BaseErrorFallback = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 24px;

  background-color: ${Colors.base.white};

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 16px;

    border: none;
    border-radius: 0px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 24px;

    border: 1px solid ${Colors.neutral.grey3};
    border-radius: 12px;
  }
`;

const ErrorLogo = styled(Image)`
  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 151px;
    height: 140px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 173px;
    height: 160px;
  }
`;

type LoadingFailedTextProps = {
  errorMessage: string;
  errorDescription: ReactNode;
};

const ErrorText = ({
  errorMessage,
  errorDescription,
}: LoadingFailedTextProps) => (
  <BaseErrorText>
    <ErrorMessage>{errorMessage}</ErrorMessage>
    <ErrorDescription>{errorDescription}</ErrorDescription>
  </BaseErrorText>
);

const BaseErrorText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  text-align: center;
`;

const ErrorMessage = styled.p`
  font-weight: 700;

  ${SubheaderFontSize}
`;

const ErrorDescription = styled.div`
  font-weight: 400;

  ${BodyFontSize}
`;
