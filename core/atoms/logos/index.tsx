import Image from "next/image";
import darkLogo from "./images/brand_logo-dark.webp";
import lightLogo from "./images/brand_logo-light.webp";

type BrandLogoProps = {
  isDarkTheme?: boolean;
  alt?: string;
};

export const BrandLogo = ({
  isDarkTheme = true,
  alt = "Grantbii",
}: BrandLogoProps) => (
  <Image
    src={isDarkTheme ? darkLogo : lightLogo}
    alt={alt}
    width={250}
    height={80}
  />
);
