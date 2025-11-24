import { css } from "styled-components";
import { WIDTH_BREAKPOINTS } from "../foundations/responsive";
import {
  BODY_FONT_SIZES,
  HEADER_FONT_SIZES,
  HELPER_FONT_SIZES,
  SUBHEADER_FONT_SIZES,
  TITLE_FONT_SIZES,
} from "../foundations/typography";

export const SmallScreenOnly = css`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    display: flex;
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
    display: flex;
  }
`;

export const TitleFontSize = css`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${TITLE_FONT_SIZES.small};
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${TITLE_FONT_SIZES.large};
  }
`;

export const HeaderFontSize = css`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${HEADER_FONT_SIZES.small};
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${HEADER_FONT_SIZES.large};
  }
`;

export const SubheaderFontSize = css`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${SUBHEADER_FONT_SIZES.small};
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${SUBHEADER_FONT_SIZES.large};
  }
`;

export const BodyFontSize = css`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${BODY_FONT_SIZES.small};
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${BODY_FONT_SIZES.large};
  }
`;

export const HelperFontSize = css`
  @media (width < ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${HELPER_FONT_SIZES.small};
  }

  @media (width >= ${WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${HELPER_FONT_SIZES.large};
  }
`;
