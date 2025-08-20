import { MoonLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/helpers/props";
import styled from "styled-components";
import { Colors } from "../foundations";

type PageLoaderProps = {
  pageWidth?: string;
  pageHeight?: string;
} & LoaderSizeProps;

/**
 * The animation to show when loading the whole page
 */
const PageLoader = ({
  pageWidth,
  pageHeight,
  color = Colors.accent.blue1,
  size = 32,
  ...restOfProps
}: PageLoaderProps) => (
  <Background $pageWidth={pageWidth} $pageHeight={pageHeight}>
    <MoonLoader color={color} size={size} {...restOfProps} />
  </Background>
);

export default PageLoader;

const Background = styled.div<{ $pageWidth?: string; $pageHeight?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ $pageWidth = "100%" }) => $pageWidth};
  height: ${({ $pageHeight = "100%" }) => $pageHeight};
`;
