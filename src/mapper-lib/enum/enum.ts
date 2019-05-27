import {SafeMapper} from "../../mapper";
import {Enum, EnumKey, EnumValue, getKeys, getValues} from "../../enum-util";
import {literal} from "../literal";

export type EnumKeyMapper<E extends typeof Enum> = (
    SafeMapper<EnumKey<E>>
);
export function enumKey<E extends typeof Enum> (e : E) : (
    EnumKeyMapper<E>
) {
    return literal(...getKeys(e));
}

export type EnumValueMapper<E extends typeof Enum> = (
    SafeMapper<EnumValue<E>>
);
export function enumValue<E extends typeof Enum> (e : E) : (
    EnumValueMapper<E>
) {
    return literal(...getValues(e)) as any;
}