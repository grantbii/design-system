import styled from "styled-components";

export const WIDTH_BREAKPOINTS = {
  laptop: "1024px",
};

export const SmallScreenOnly = styled.div`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }
`;

export const BigScreenOnly = styled.div`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }
`;
