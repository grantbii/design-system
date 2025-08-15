export * from "@phosphor-icons/react";
import Image from "next/image";
import grantMatchIcon from "../assets/icons/grant_match.webp";

type GrantMatchIconProps = {
  size?: number;
};

export const GrantMatchIcon = ({ size = 20 }: GrantMatchIconProps) => (
  <Image src={grantMatchIcon} alt="Grant Match" width={size} height={size} />
);
