"use client";

import Image from "next/image";
import styled from "styled-components";
import darkLogo from "../assets/logos/brand_logo-dark.webp";
import lightLogo from "../assets/logos/brand_logo-light.webp";
import { Responsive } from "../foundations";

type BrandLogoProps = {
  isDarkTheme?: boolean;
  alt?: string;
};

const BrandLogo = ({
  isDarkTheme = true,
  alt = "Grantbii",
}: BrandLogoProps) => (
  <CustomImage
    src={isDarkTheme ? darkLogo : lightLogo}
    width={250}
    height={80}
    alt={alt}
    priority
  />
);

export default BrandLogo;

const CustomImage = styled(Image)`
  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 125px;
    height: 40px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 150px;
    height: 48px;
  }
`;
