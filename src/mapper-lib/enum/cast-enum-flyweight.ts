import {Enum, EnumKey, getKeys} from "../../enum-util";
import {ToOneEnumValueMapper, ToOneEnumKeyMapper, toOneEnumValue, toOneEnumKey} from "./cast";

export type CastEnumFlyweight<E extends typeof Enum> = (
    {
        toValue : {
            [k in EnumKey<E>] : (
                ToOneEnumValueMapper<E, k>
            )
        },
        toKey : {
            [k in EnumKey<E>] : (
                ToOneEnumKeyMapper<E, k>
            )
        },
    }
);
export function castEnumFlyweight<E extends typeof Enum> (e : E) : (
    CastEnumFlyweight<E>
) {
    const keys = getKeys(e);
    const result : CastEnumFlyweight<E> = {
        toValue : keys.reduce<CastEnumFlyweight<E>["toValue"]>(
            (memo, k) => {
                memo[k] = toOneEnumValue(e, k);
                return memo;
            },
            {} as any
        ),
        toKey : keys.reduce<CastEnumFlyweight<E>["toKey"]>(
            (memo, k) => {
                memo[k] = toOneEnumKey(e, k);
                return memo;
            },
            {} as any
        ),
    };
    return result;
}