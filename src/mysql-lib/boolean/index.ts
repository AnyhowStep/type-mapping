import {
    SafeMapper,
    ExpectedInput,
    MappableInput,
} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import * as fLib from "../../fluent-lib";
import * as TypeUtil from "../../type-util";

/**
    Converts some values to `boolean`.

    The values `0|1|"0"|"1"` were chosen because
    these values are most likely to show up from
    a MySQL driver to represent a `boolean`

    The values `"false"|"true"` were chosen because
    these values will show up in query strings.
*/
export function boolean () : (
    FluentMapper<
        & SafeMapper<boolean>
        & ExpectedInput<boolean>
        & MappableInput<boolean | 0 | 1 | "0" | "1" | "false" | "true" | 0n | 1n>
    >
) {
    const BigInt = TypeUtil.getBigIntFactoryFunctionOrError();
    return fLib.or(
        fLib.boolean(),
        fLib.literal("0", "1", 0, 1, "false", "true", BigInt(0) as 0n, BigInt(1) as 1n).pipe(
            (name : string, v : "0"|"1"|0|1|"false"|"true"|0n|1n) : boolean => {
                switch (v) {
                    case "0": return false;
                    case "1": return true;
                    case 0: return false;
                    case 1: return true;
                    case "false": return false;
                    case "true": return true;
                    default : {
                        const str = String(v);
                        if (str == "0") {
                            return false;
                        } else if (str == "1") {
                            return true;
                        }
                        //Shouldn't happen
                        throw new Error(`Expected ${name} to be one of '0'|'1'|0|1|'false'|'true'|'0n'|'1n'`);
                    }
                }
            }
        )
    ).withExpectedInput<boolean>();
}

/**
    Converts some values to `true`.

    The values `1|"1"` were chosen because
    these values are most likely to show up from
    a MySQL driver to represent a `boolean`

    The values `"true"` was chosen because
    it will show up in query strings.
*/
function toTrue () : (
    FluentMapper<
        & SafeMapper<true>
        & ExpectedInput<true>
        & MappableInput<true | 1 | "1" | "true" | 1n>
    >
) {
    const BigInt = TypeUtil.getBigIntFactoryFunctionOrError();
    return fLib.or(
        fLib.literal(true),
        fLib.literal("1", 1, "true", BigInt(1) as 1n).pipe(
            (name : string, v : "1"|1|"true"|1n) : true => {
                switch (v) {
                    case "1": return true;
                    case 1: return true;
                    case "true": return true;
                    default : {
                        const str = String(v);
                        if (str == "1") {
                            return true;
                        }
                        //Shouldn't happen
                        throw new Error(`Expected ${name} to be one of '1'|1|'true'`);
                    }
                }
            }
        )
    ).withExpectedInput<true>();
}

/**
    Converts some values to `false`.

    The values `0|"0"` were chosen because
    these values are most likely to show up from
    a MySQL driver to represent a `boolean`

    The values `"false"` was chosen because
    it will show up in query strings.
*/
function toFalse () : (
    FluentMapper<
        & SafeMapper<false>
        & ExpectedInput<false>
        & MappableInput<false | 0 | "0" | "false" | 0n>
    >
) {
    const BigInt = TypeUtil.getBigIntFactoryFunctionOrError();
    return fLib.or(
        fLib.literal(false),
        fLib.literal("0", 0, "false", BigInt(0) as 0n).pipe(
            (name : string, v : "0"|0|"false"|0n) : false => {
                switch (v) {
                    case "0": return false;
                    case 0: return false;
                    case "false": return false;
                    default : {
                        const str = String(v);
                        if (str == "0") {
                            return false;
                        }
                        //Shouldn't happen
                        throw new Error(`Expected ${name} to be one of '0'|0|'false'`);
                    }
                }
            }
        )
    ).withExpectedInput<false>();
}

export {
    toTrue as true,
    toFalse as false,
};