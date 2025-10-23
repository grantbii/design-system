import { create } from "storybook/theming";
import "../core/assets/fonts/satoshi/css/satoshi.css";

const grantbiiTheme = create({
  base: "light",
  brandTitle: "Grantbii",
  brandImage:
    "https://grantbii-logos.s3.ap-southeast-1.amazonaws.com/grantbii_logo.webp",
  brandUrl: "https://grantbii.com",
  brandTarget: "_blank",
  fontBase: "Satoshi",
});

export default grantbiiTheme;
