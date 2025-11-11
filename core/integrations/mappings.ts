import { Location } from "@grantbii/ui-core/grant/enums";
import type { BaseEnumType } from "@grantbii/ui-core/shared/enums";
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
  [Location.UNITED_KINGDOM]: Flags.GB,
  [Location.UNKNOWN]: Flags.SG,
};
