import Image from "next/image";
import darkLogo from "../../public/logos/brand_logo-dark.webp";
import lightLogo from "../../public/logos/brand_logo-light.webp";

type BrandLogoProps = {
  width?: number;
  height?: number;
  isDarkTheme?: boolean;
  alt?: string;
};

export const BrandLogo = ({
  width = 250,
  height = 80,
  isDarkTheme = true,
  alt = "Grantbii",
}: BrandLogoProps) => (
  <Image
    src={isDarkTheme ? darkLogo : lightLogo}
    alt={alt}
    width={width}
    height={height}
  />
);
