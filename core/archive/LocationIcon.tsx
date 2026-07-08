import { Location } from "@grantbii/ui-core/location/enums";
import type { JSX } from "react";
import { RichIcon, SystemIcon } from "../atoms";

type LocationIconProps = {
  location: Location;
  width?: string | number;
};

const LocationIcon = ({ location, width }: LocationIconProps): JSX.Element => {
  if (location === Location.OTHERS || location === Location.UNKNOWN) {
    return <SystemIcon.GlobeIcon size={width} />;
  } else {
    const Flag = LOCATION_FLAG_MAP[location] ?? RichIcon.Flag.EU;
    return <Flag width={width} />;
  }
};

export default LocationIcon;

const LOCATION_FLAG_MAP: {
  [location in Location]: RichIcon.Flag.FlagComponent;
} = {
  [Location.SINGAPORE]: RichIcon.Flag.SG,
  [Location.HONG_KONG]: RichIcon.Flag.HK,
  [Location.MALAYSIA]: RichIcon.Flag.MY,
  [Location.SOUTH_KOREA]: RichIcon.Flag.KR,
  [Location.JAPAN]: RichIcon.Flag.JP,
  [Location.CHINA]: RichIcon.Flag.CN,
  [Location.UNITED_KINGDOM]: RichIcon.Flag.GB,
  [Location.UNITED_STATES]: RichIcon.Flag.US,
  [Location.OTHERS]: RichIcon.Flag.EU,
  [Location.UNKNOWN]: RichIcon.Flag.EU,
};
