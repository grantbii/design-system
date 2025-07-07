import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  devIndicators: false,
  compiler: { styledComponents: true },
  transpilePackages: ["@grantbii/design-system"],
  webpack(config) {
    // preserve any existing aliases...
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      // map '@' → the design-system source folder
      "@": path.resolve(__dirname, "node_modules/@grantbii/design-system"),
    };
    return config;
  },
};

export default nextConfig;
