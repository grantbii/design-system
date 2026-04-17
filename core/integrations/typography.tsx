import { css } from "styled-components";
import { WIDTH_BREAKPOINTS } from "../atoms/Responsive";
import type { TextStyle } from "../atoms/Typography";

export const applyTypography = (style: TextStyle) => css`
  font-family: ${style.fontFamily};
  font-weight: ${style.fontWeight};

  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${style.fontSize.small};
    line-height: ${style.lineHeight.small};
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${style.fontSize.large};
    line-height: ${style.lineHeight.large};
  }
`;
