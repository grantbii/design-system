"use client";

import { MoonLoader, PacmanLoader } from "react-spinners";
import { LoaderSizeMarginProps } from "react-spinners/helpers/props";
import styled from "styled-components";
import { Colors } from "../foundations";

type PageLoaderProps = {
  isPacman?: boolean;
} & LoaderSizeMarginProps;

/**
 * The animation to show when loading the whole page
 */
const PageLoader = ({
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
  </Background>
);

export default PageLoader;

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;
