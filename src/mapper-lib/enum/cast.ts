import {Enum, EnumKey, EnumValue, getEntries} from "../../enum-util";
import {SafeMapper} from "../../mapper";
import {ExpectedInput} from "../../mapper";
import {MappableInput} from "../../mapper";
import {or} from "../operator";
import {mapper} from "../../mapper";
import {literal} from "../literal";
import {toTypeStr} from "../../type-util";

export type ToEnumValueMapper<E extends typeof Enum> = (
    & SafeMapper<EnumValue<E>>
    & ExpectedInput<EnumValue<E>>
    & MappableInput<EnumValue<E>|EnumKey<E>>
);
export function toEnumValue<E extends typeof Enum> (e : E) : (
    ToEnumValueMapper<E>
) {
    const entries = getEntries(e);
    const mappableKeys = entries.map(e => e.key).join("|");
    //https://github.com/microsoft/TypeScript/issues/31602
    //Discovered string and conditional types also give problems
    return mapper<ToEnumValueMapper<E>>(
        or(
            literal(...entries.map(e => e.value)),
            //Not a value, so maybe a key?
            (name : string, mixed : unknown) : EnumValue<E> => {
                for (const entry of entries) {
                    if (mixed === entry.key) {
                        return entry.value as any;
                    }
                }
                throw new Error(`${name} must be ${mappableKeys}; received ${toTypeStr(mixed)}`);
            }
        ) as any
    );
}

export type ToEnumKeyMapper<E extends typeof Enum> = (
    & SafeMapper<EnumKey<E>>
    & ExpectedInput<EnumKey<E>>
    & MappableInput<EnumValue<E>|EnumKey<E>>
);
export function toEnumKey<E extends typeof Enum> (e : E) : (
    ToEnumKeyMapper<E>
) {
    const entries = getEntries(e);
    const mappableValues = entries.map(e => e.value).join("|");
    //https://github.com/microsoft/TypeScript/issues/31602
    //Discovered string and conditional types also give problems
    return mapper<ToEnumKeyMapper<E>>(
        or(
            literal(...entries.map(e => e.key)),
            //Not a key, so maybe a value?
            (name : string, mixed : unknown) : EnumKey<E> => {
                for (const entry of entries) {
                    if (mixed === entry.value) {
                        return entry.key as any;
                    }
                }
                throw new Error(`${name} must be ${mappableValues}; received ${toTypeStr(mixed)}`);
            }
        ) as any
    );
}

export type ToOneEnumValueMapper<E extends typeof Enum, K extends EnumKey<E>> = (
    & SafeMapper<E[K]>
    & ExpectedInput<E[K]>
    & MappableInput<E[K]|K>
);
export function toOneEnumValue<E extends typeof Enum, K extends EnumKey<E>> (
    e : E,
    k : K
) : (
    ToOneEnumValueMapper<E, K>
) {
    const desiredValue = e[k];

    const entries = getEntries(e);
    const validKeys = entries
        .filter(entry => (
            (entry.value as any) === desiredValue &&
            (entry.key as any) !== desiredValue
        ))
        .map(entry => entry.key);
    const mappable = (
        String(desiredValue) +
        " or " +
        validKeys.join("|")
    );

    return mapper<ToOneEnumValueMapper<E, K>>(
        (name : string, mixed : unknown) : E[K] => {
            if (mixed === desiredValue) {
                return desiredValue;
            }

            for (const validKey of validKeys) {
                if (mixed === validKey) {
                    return desiredValue;
                }
            }

            throw new Error(`${name} must be ${mappable}; received ${toTypeStr(mixed)}`);
        }
    );
}

export type ToOneEnumKeyMapper<E extends typeof Enum, K extends EnumKey<E>> = (
    & SafeMapper<K>
    & ExpectedInput<K>
    & MappableInput<E[K]|K>
);
export function toOneEnumKey<E extends typeof Enum, K extends EnumKey<E>> (
    e : E,
    k : K
) : (
    ToOneEnumKeyMapper<E, K>
) {
    const validValue = e[k];

    const entries = getEntries(e);
    const validKeys = entries
        .filter(e => (
            (e.value as any) === validValue &&
            (e.key as any) !== validValue &&
            (e.key as any) !== k
        ))
        .map(e => e.key);
    const mappable = (
        String(k) +
        " or " +
        validKeys.join("|") +
        " or " +
        String(validValue)
    );

    return mapper<ToOneEnumKeyMapper<E, K>>(
        (name : string, mixed : unknown) : K => {
            if (mixed === k) {
                return k;
            }

            for (const validKey of validKeys) {
                if (mixed === validKey) {
                    return k;
                }
            }

            if (mixed === validValue) {
                return k;
            }

            throw new Error(`${name} must be ${mappable}; received ${toTypeStr(mixed)}`);
        }
    );
}