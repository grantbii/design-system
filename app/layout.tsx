import { GlobalStyle, StyledComponentsRegistry } from "@/core";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Grantbii's Design System",
  description: "Grantbii's Design System",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      <StyledComponentsRegistry>
        <GlobalStyle />
        {children}
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
