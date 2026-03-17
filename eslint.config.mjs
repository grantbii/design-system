import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import storybook from "eslint-plugin-storybook";
import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
  ...storybook.configs["flat/recommended"],
  ...nextVitals,
  ...nextTs,
  prettier,
]);

export default eslintConfig;
// TODO: https://github.com/vercel/next.js/issues/89764
