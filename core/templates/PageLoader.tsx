import { MoonLoader, PacmanLoader } from "react-spinners";
import type { LoaderSizeMarginProps } from "react-spinners/helpers/props";
import styled from "styled-components";
import { Colors, Responsive, Typography } from "../foundations";

type PageLoaderProps = {
  isPacman?: boolean;
  loadingText?: string;
  tip?: string;
} & LoaderSizeMarginProps;

/**
 * The animation to show when loading the whole page
 */
const PageLoader = ({
  loadingText,
  tip,
  isPacman = false,
  color = Colors.accent.blue1,
  size,
  ...restOfProps
}: PageLoaderProps) => (
  <Background>
    {isPacman ? (
      <PacmanLoader color={color} size={size ? size : 20} {...restOfProps} />
    ) : (
      <MoonLoader color={color} size={size ? size : 32} {...restOfProps} />
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
`;

const LoadingText = styled.p`
  font-weight: 500;
`;

const Tip = styled.p`
  color: ${Colors.typography.blackMedium};

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.HELPER_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.HELPER_FONT_SIZES.big};
  }
`;
