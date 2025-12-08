import type { BaseEnumType } from "@grantbii/ui-core/enums";
import { Location } from "@grantbii/ui-core/location/enums";
import { Flags, type Option } from "../foundations";

export const mapEnumToOptions = <EnumType extends BaseEnumType>(
  enumType: EnumType,
): Option[] =>
  Object.values(enumType)
    .filter((value) => value !== enumType.UNKNOWN)
    .map((value) => ({ label: value, value }));

export const LOCATION_FLAG_MAP: {
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
  [Location.OTHERS]: Flags.SG,
  [Location.UNKNOWN]: Flags.SG,
};
