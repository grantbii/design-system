import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import storybook from "eslint-plugin-storybook";
import { defineConfig } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextTs,
  ...nextVitals,
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // allows for <a> instead of restricting to <Link>
      "@next/next/no-html-link-for-pages": "off",
      // allows for unused variable if it has prefix of _
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
]);

export default eslintConfig;
