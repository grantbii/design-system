import { css } from "styled-components";

export const WIDTH_BREAKPOINTS = {
  laptop: "1024px",
};

export const SmallScreenOnly = css`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }
`;

export const LargeScreenOnly = css`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }
`;
