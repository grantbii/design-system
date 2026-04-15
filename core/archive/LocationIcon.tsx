import { Location } from "@grantbii/ui-core/location/enums";
import type { JSX } from "react";
import { Flags, Icons } from "../atoms";

type LocationIconProps = {
  location: Location;
  width?: string | number;
};

const LocationIcon = ({ location, width }: LocationIconProps): JSX.Element => {
  if (location === Location.OTHERS || location === Location.UNKNOWN) {
    return <Icons.GlobeIcon size={width} />;
  } else {
    const Flag = LOCATION_FLAG_MAP[location] ?? Flags.EU;
    return <Flag width={width} />;
  }
};

export default LocationIcon;

const LOCATION_FLAG_MAP: {
  [location in Location]: Flags.FlagComponent;
} = {
  [Location.SINGAPORE]: Flags.SG,
  [Location.HONG_KONG]: Flags.HK,
  [Location.MALAYSIA]: Flags.MY,
  [Location.SOUTH_KOREA]: Flags.KR,
  [Location.JAPAN]: Flags.JP,
  [Location.CHINA]: Flags.CN,
  [Location.UNITED_KINGDOM]: Flags.GB,
  [Location.UNITED_STATES]: Flags.US,
  [Location.OTHERS]: Flags.EU,
  [Location.UNKNOWN]: Flags.EU,
};
