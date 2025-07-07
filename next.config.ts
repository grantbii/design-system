import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  devIndicators: false,
  webpack(config) {
    // preserve any existing aliases...
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      // map '@' → the design-system source folder
      "@": path.resolve(__dirname, "node_modules/@grantbii/design-system/src"),
    };
    return config;
  },
};

export default nextConfig;
