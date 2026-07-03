import type { ScreenSize } from "../types";

type FontWeightLabel = "regular" | "medium" | "bold";
type FontWeight = 400 | 500 | 700;
type ResponsiveValue = Record<ScreenSize, string>;

const responsivePx = (desktopPx: number, mobilePx: number): ResponsiveValue =>
  ({
    small: `${mobilePx}px`,
    large: `${desktopPx}px`,
  }) as const;

export const family = {
  satoshi: "Satoshi",
};

export const weight: { [label in FontWeightLabel]: FontWeight } = {
  regular: 400,
  medium: 500,
  bold: 700,
};

export type TextStyle = {
  fontFamily: string;
  fontWeight: FontWeight;
  fontSize: ResponsiveValue;
};

const textStyle = (
  fontWeight: FontWeight,
  desktopFontSize: number,
  mobileFontSize: number = desktopFontSize - 2,
): TextStyle => ({
  fontFamily: family.satoshi,
  fontWeight,
  fontSize: responsivePx(desktopFontSize, mobileFontSize),
});

export const heading1 = textStyle(weight.bold, 32);
export const heading2 = textStyle(weight.bold, 28);
export const heading3 = textStyle(weight.bold, 24);

export const subheading1Bold = textStyle(weight.bold, 20);
export const subheading1Medium = textStyle(weight.medium, 20);
export const subheading1Regular = textStyle(weight.regular, 20);

export const subheading2Bold = textStyle(weight.bold, 18);
export const subheading2Medium = textStyle(weight.medium, 18);
export const subheading2Regular = textStyle(weight.regular, 18);

export const bodyPrimaryBold = textStyle(weight.bold, 16);
export const bodyPrimaryMedium = textStyle(weight.medium, 16);
export const bodyPrimaryRegular = textStyle(weight.regular, 16);

export const bodySecondaryBold = textStyle(weight.bold, 14);
export const bodySecondaryMedium = textStyle(weight.medium, 14);
export const bodySecondaryRegular = textStyle(weight.regular, 14);

export const captionBold = textStyle(weight.bold, 12, 12);
export const captionMedium = textStyle(weight.medium, 12, 12);
export const captionRegular = textStyle(weight.regular, 12, 12);
