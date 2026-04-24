import { MoonLoader, PacmanLoader } from "react-spinners";
import type { LoaderSizeMarginProps } from "react-spinners/helpers/props";
import styled from "styled-components";
import { Color, Spacing, Typography } from "../atoms";
import { applyTypography } from "../integrations";

type PageLoaderProps = {
  pacman?: boolean;
  loadingText?: string;
  tip?: string;
} & LoaderSizeMarginProps;

/**
 * The animation to show when loading the whole page
 */
const PageLoader = ({
  loadingText,
  tip,
  pacman = false,
  color = Color.accent.blue1,
  size,
  ...restOfProps
}: PageLoaderProps) => (
  <Background>
    {pacman ? (
      <PacmanLoader color={color} size={size ?? 20} {...restOfProps} />
    ) : (
      <MoonLoader color={color} size={size ?? 32} {...restOfProps} />
    )}

    {loadingText || tip ? (
      <Text>
        {loadingText ? <LoadingText>{loadingText}</LoadingText> : <></>}
        {tip ? <Tip>{tip}</Tip> : <></>}
      </Text>
    ) : (
      <></>
    )}
  </Background>
);

export default PageLoader;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  margin: 0px ${Spacing.px32};

  text-align: center;
`;

const LoadingText = styled.p`
  font-weight: 500;
`;

const Tip = styled.p`
  color: ${Color.typography.blackMedium};

  ${applyTypography(Typography.bodySecondaryRegular)}
`;
