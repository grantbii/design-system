import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import storybook from "eslint-plugin-storybook";
import { defineConfig } from "eslint/config";

const typescriptUnusedCodeRules = {
  // catches unused TypeScript variables, including unused imports
  files: ["**/*.{ts,tsx}"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};

const componentLibraryNextRules = {
  rules: {
    // This package is a component library, not a Next.js app with pages routes.
    "@next/next/no-html-link-for-pages": "off",
  },
};

const eslintConfig = defineConfig([
  ...storybook.configs["flat/recommended"],
  ...nextVitals,
  ...nextTs,
  prettier,
  typescriptUnusedCodeRules,
  componentLibraryNextRules,
]);

export default eslintConfig;
// TODO: https://github.com/vercel/next.js/issues/89764
