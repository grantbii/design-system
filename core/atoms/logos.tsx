import Image from "next/image";

type BrandLogoProps = {
  isDarkTheme?: boolean;
  alt?: string;
};

export const BrandLogo = ({
  isDarkTheme = true,
  alt = "Grantbii",
}: BrandLogoProps) => (
  <Image
    src={`/logos/brand_logo-${isDarkTheme ? "dark" : "light"}.webp`}
    alt={alt}
    width={250}
    height={80}
  />
);
