import type { ScreenSize } from "../types";

type FontWeight = 400 | 500 | 700;
type ResponsiveValue = Record<ScreenSize, string>;

const responsivePx = (desktopPx: number, mobilePx: number): ResponsiveValue =>
  ({
    small: `${mobilePx}px`,
    large: `${desktopPx}px`,
  }) as const;

const fixedPx = (px: number): ResponsiveValue =>
  ({
    small: `${px}px`,
    large: `${px}px`,
  }) as const;

export const family = {
  satoshi: "Satoshi",
};

export const weight: { [label: string]: FontWeight } = {
  regular: 400,
  medium: 500,
  bold: 700,
};

export type TextStyle = {
  fontFamily: string;
  fontWeight: FontWeight;
  fontSize: ResponsiveValue;
  lineHeight: ResponsiveValue;
};

const textStyle = (
  fontWeight: FontWeight,
  desktopFontSize: number,
  lineHeight: number,
  mobileFontSize: number = desktopFontSize - 2,
): TextStyle => ({
  fontFamily: family.satoshi,
  fontWeight,
  fontSize: responsivePx(desktopFontSize, mobileFontSize),
  lineHeight: fixedPx(lineHeight),
});

export const heading1 = textStyle(weight.bold, 32, 43);
export const heading2 = textStyle(weight.bold, 28, 38);
export const heading3 = textStyle(weight.bold, 24, 32);

export const subheading1Bold = textStyle(weight.bold, 20, 27);
export const subheading1Medium = textStyle(weight.medium, 20, 27);
export const subheading1Regular = textStyle(weight.regular, 20, 27);

export const subheading2Bold = textStyle(weight.bold, 18, 24);
export const subheading2Medium = textStyle(weight.medium, 18, 24);
export const subheading2Regular = textStyle(weight.regular, 18, 24);

export const bodyPrimaryBold = textStyle(weight.bold, 16, 22);
export const bodyPrimaryMedium = textStyle(weight.medium, 16, 22);
export const bodyPrimaryRegular = textStyle(weight.regular, 16, 22);

export const bodySecondaryBold = textStyle(weight.bold, 14, 19);
export const bodySecondaryMedium = textStyle(weight.medium, 14, 19);
export const bodySecondaryRegular = textStyle(weight.regular, 14, 19);

export const captionBold = textStyle(weight.bold, 12, 16, 12);
export const captionMedium = textStyle(weight.medium, 12, 16, 12);
export const captionRegular = textStyle(weight.regular, 12, 16, 12);
