import Image from "next/image";
import styled from "styled-components";
import fullColorLogo from "../assets/logos/brand_logo-full_color.webp";
import reversedColorLogo from "../assets/logos/brand_logo-reversed_color.webp";
import fullColorLogomark from "../assets/logos/brand_logomark-full_color.webp";
import reversedColorLogomark from "../assets/logos/brand_logomark-reversed_color.webp";
import * as Responsive from "../atoms/Responsive";

type ColorVariant = "full" | "reversed";

type BrandLogoProps = {
  colorVariant?: ColorVariant;
  isLogomark?: boolean;
  smallScreenWidth?: string;
  smallScreenHeight?: string;
  bigScreenWidth?: string;
  bigScreenHeight?: string;
  borderRadius?: string;
  alt?: string;
};

const BrandLogo = ({
  colorVariant = "full",
  isLogomark = false,
  smallScreenWidth = "125px",
  smallScreenHeight = "40px",
  bigScreenWidth = "150px",
  bigScreenHeight = "48px",
  borderRadius = "0px",
  alt = "Grantbii",
}: BrandLogoProps) => {
  const src = isLogomark
    ? variantToLogomarkSrc(colorVariant)
    : variantToLogoSrc(colorVariant);

  const imageProps = {
    src,
    alt,
    priority: true,
    width: ORIGINAL_WIDTH,
    height: ORIGINAL_HEIGHT,
    $smallScreenWidth: smallScreenWidth,
    $smallScreenHeight: smallScreenHeight,
    $bigScreenWidth: bigScreenWidth,
    $bigScreenHeight: bigScreenHeight,
    $borderRadius: borderRadius,
    $isLogomark: isLogomark,
  };

  return <BrandImage {...imageProps} />;
};

export default BrandLogo;

const ORIGINAL_WIDTH = 250;
const ORIGINAL_HEIGHT = 80;

const variantToLogomarkSrc = (colorVariant: ColorVariant) =>
  colorVariant === "full" ? fullColorLogomark : reversedColorLogomark;

const variantToLogoSrc = (colorVariant: ColorVariant) =>
  colorVariant === "full" ? fullColorLogo : reversedColorLogo;

type BrandImageProps = {
  $isLogomark: boolean;
  $smallScreenWidth: string;
  $smallScreenHeight: string;
  $bigScreenWidth: string;
  $bigScreenHeight: string;
  $borderRadius: string;
};

const BrandImage = styled(Image)<BrandImageProps>`
  border-radius: ${(props) => props.$borderRadius};

  @media (width < ${Responsive.widthBreakpoint.laptop}) {
    width: ${(props) =>
      props.$isLogomark ? props.$smallScreenHeight : props.$smallScreenWidth};
    height: ${(props) => props.$smallScreenHeight};
  }

  @media (width >= ${Responsive.widthBreakpoint.laptop}) {
    width: ${(props) =>
      props.$isLogomark ? props.$bigScreenHeight : props.$bigScreenWidth};
    height: ${(props) => props.$bigScreenHeight};
  }
`;
