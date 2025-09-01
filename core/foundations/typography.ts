import type { ScreenSize } from "./types";

type FontSizes = { [screenSize in ScreenSize]: string };

export const TITLE_FONT_SIZES: FontSizes = {
  big: "24px",
  small: "22px",
};

export const HEADER_FONT_SIZES: FontSizes = {
  big: "22px",
  small: "20px",
};

export const SUBHEADER_FONT_SIZES: FontSizes = {
  big: "20px",
  small: "18px",
};

export const BODY_FONT_SIZES: FontSizes = {
  big: "16px",
  small: "14px",
};

export const HELPER_FONT_SIZES: FontSizes = {
  big: "14px",
  small: "12px",
};
