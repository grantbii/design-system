export * from "@phosphor-icons/react";
import Image from "next/image";

type GrantMatchIconProps = {
  size?: number;
};

export const GrantMatchIcon = ({ size = 20 }: GrantMatchIconProps) => (
  <Image
    src="/icons/grant_match.webp"
    alt="Grant Match"
    width={size}
    height={size}
  />
);
