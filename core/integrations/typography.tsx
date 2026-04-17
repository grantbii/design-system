import { css } from "styled-components";
import { Responsive, Typography } from "../atoms";

export const applyTypography = (style: Typography.TextStyle) => css`
  font-family: ${style.fontFamily};
  font-weight: ${style.fontWeight};

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${style.fontSize.small};
    line-height: ${style.lineHeight.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${style.fontSize.large};
    line-height: ${style.lineHeight.large};
  }
`;
