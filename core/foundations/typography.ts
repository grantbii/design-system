import type { ScreenSize } from "./types";

type FontSizes = { [screenSize in ScreenSize]: string };

export const TITLE_FONT_SIZES: FontSizes = {
  small: "22px",
  large: "24px",
};

export const HEADER_FONT_SIZES: FontSizes = {
  small: "20px",
  large: "22px",
};

export const SUBHEADER_FONT_SIZES: FontSizes = {
  small: "18px",
  large: "20px",
};

export const BODY_FONT_SIZES: FontSizes = {
  small: "14px",
  large: "16px",
};

export const HELPER_FONT_SIZES: FontSizes = {
  small: "12px",
  large: "14px",
};
