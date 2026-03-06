import type { BaseEnumType } from "@grantbii/ui-core/enums";
import type { Option } from "../foundations";

export const enumToOptions = <EnumType extends BaseEnumType>(
  enumType: EnumType,
): Option[] =>
  Object.values(enumType)
    .filter((value) => value !== enumType.UNKNOWN)
    .map((value) => ({ label: value, value }));
