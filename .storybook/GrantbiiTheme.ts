import { create } from "storybook/theming";
import "../core/assets/fonts/satoshi/css/satoshi.css";
// import brandLogo from "../core/assets/logos/brand_logo-dark.webp"; TODO

const grantbiiTheme = create({
  base: "light",
  brandTitle: "Grantbii",
  // brandImage: brandLogo,
  brandUrl: "https://grantbii.com",
  brandTarget: "_blank",
  fontBase: "Satoshi",
});

export default grantbiiTheme;
