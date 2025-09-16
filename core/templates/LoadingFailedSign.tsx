import Image from "next/image";
import styled from "styled-components";
import loadFailLogo from "../assets/logos/load_fail_logo.webp";
import { Colors, Responsive, Typography } from "../foundations";
import Link from "next/link";
import type { MouseEventHandler } from "react";
import { Button } from "../atoms";

type LoadingFailedSignProps = {
  onClickReload?: MouseEventHandler<HTMLButtonElement>;
};

const LoadingFailedSign = ({ onClickReload }: LoadingFailedSignProps) => (
  <BaseLoadFail>
    <LoadFailImage
      src={loadFailLogo}
      width={693}
      height={641}
      alt="Failed to load results"
      priority
    />

    <Text>
      <ErrorMessage>Failed to load results</ErrorMessage>
      <ErrorDescription>
        Please refresh or try again in a moment <br /> or contact us at{" "}
        <SupportEmailLink href="mailto:support@grantbii.com">
          support@grantbii.com
        </SupportEmailLink>
      </ErrorDescription>
    </Text>

    {onClickReload ? (
      <Button
        text="Try Again"
        onClick={onClickReload}
        backgroundColor={Colors.base.white}
        borderColor={Colors.neutral.grey3}
        color={Colors.typography.blackHigh}
      />
    ) : (
      <></>
    )}
  </BaseLoadFail>
);

export default LoadingFailedSign;

const BaseLoadFail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 24px;

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

const LoadFailImage = styled(Image)`
  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 151px;
    height: 140px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 173px;
    height: 160px;
  }
`;

const Text = styled.div`
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
    font-size: ${Typography.SUBHEADER_FONT_SIZES.big};
  }
`;

const ErrorDescription = styled.p`
  font-weight: 400;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.BODY_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.BODY_FONT_SIZES.big};
  }
`;

const SupportEmailLink = styled(Link)`
  text-decoration: underline;
`;
