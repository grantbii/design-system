import Image from "next/image";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import styled from "styled-components";
import loadFailLogo from "../assets/logos/load_fail_logo.webp";
import { Button } from "../atoms";
import { Colors, Responsive, Typography } from "../foundations";

type LoadingFailedSignProps = {
  errorMessage?: string;
  onClickReload?: MouseEventHandler<HTMLButtonElement>;
};

const LoadingFailedSign = ({
  errorMessage = "Failed to load results",
  onClickReload,
}: LoadingFailedSignProps) => (
  <BaseLoadingFailedSign>
    <LoadingFailedImage
      src={loadFailLogo}
      width={693}
      height={641}
      alt={errorMessage}
    />

    <LoadingFailedText errorMessage={errorMessage} />

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
  </BaseLoadingFailedSign>
);

export default LoadingFailedSign;

const BaseLoadingFailedSign = styled.div`
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

const LoadingFailedImage = styled(Image)`
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
};

const LoadingFailedText = ({ errorMessage }: LoadingFailedTextProps) => (
  <BaseLoadingFailedText>
    <ErrorMessage>{errorMessage}</ErrorMessage>
    <ErrorDescription>
      Please try again in a moment or <br /> contact us at{" "}
      <SupportEmailLink href="mailto:support@grantbii.com">
        support@grantbii.com
      </SupportEmailLink>
    </ErrorDescription>
  </BaseLoadingFailedText>
);

const BaseLoadingFailedText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  text-align: center;
`;

const ErrorMessage = styled.p`
  font-weight: 700;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.SUBHEADER_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.SUBHEADER_FONT_SIZES.large};
  }
`;

const ErrorDescription = styled.p`
  font-weight: 400;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.BODY_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.BODY_FONT_SIZES.large};
  }
`;

const SupportEmailLink = styled(Link)`
  text-decoration: underline;
`;
