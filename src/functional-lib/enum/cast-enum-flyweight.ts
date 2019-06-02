import {Enum, EnumKey, getKeys} from "../../enum-util";
import {
    ToOneEnumValueMapper,
    ToOneEnumKeyMapper,
    toOneEnumValue,
    toOneEnumKey,
    ToEnumValueMapper,
    ToEnumKeyMapper,
    toEnumValue,
    toEnumKey,
} from "./cast";

export type CastEnumFlyweight<E extends typeof Enum> = (
    {
        toValue : (
            & ToEnumValueMapper<E>
            & {
                [k in EnumKey<E>] : (
                    ToOneEnumValueMapper<E, k>
                )
            }
        ),
        toKey : (
            & ToEnumKeyMapper<E>
            & {
                [k in EnumKey<E>] : (
                    ToOneEnumKeyMapper<E, k>
                )
            }
        ),
    }
);
export function castEnumFlyweight<E extends typeof Enum> (e : E) : (
    CastEnumFlyweight<E>
) {
    const keys = getKeys(e);
    const result : CastEnumFlyweight<E> = {
        toValue : keys.reduce<CastEnumFlyweight<E>["toValue"]>(
            (memo, k) => {
                (memo as any)[k] = toOneEnumValue(e, k);
                return memo;
            },
            toEnumValue(e) as any
        ),
        toKey : keys.reduce<CastEnumFlyweight<E>["toKey"]>(
            (memo, k) => {
                (memo as any)[k] = toOneEnumKey(e, k);
                return memo;
            },
            toEnumKey(e) as any
        ),
    };
    return result;
}