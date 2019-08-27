import {
    SafeMapper,
    ExpectedInput,
    MappableInput,
} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {getBigIntFactoryFunctionOrError} from "../../type-util";
import * as fLib from "../../fluent-lib";

/**
    Does not restrict the min and max value
*/
function unsafeBigInt () : (
    FluentMapper<
        & SafeMapper<bigint>
        & ExpectedInput<bigint>
        & MappableInput<string | number | bigint>
    >
) {
    return fLib.toBigInt();
}
/**
    Only allows,
    [-9,223,372,036,854,775,808, 9,223,372,036,854,775,807]
*/
export function bigIntSigned () : (
    FluentMapper<
        & SafeMapper<bigint>
        & ExpectedInput<bigint>
        & MappableInput<string | number | bigint>
    >
) {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return unsafeBigInt().pipe(
        fLib.bigIntRange({
            gtEq : bigIntFactory("-9223372036854775808"),
            ltEq : bigIntFactory("9223372036854775807"),
        })
    );
}
/**
    Only allows,
    [0, 18,446,744,073,709,551,615]
*/
export function bigIntUnsigned () : (
    FluentMapper<
        & SafeMapper<bigint>
        & ExpectedInput<bigint>
        & MappableInput<string | number | bigint>
    >
) {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return unsafeBigInt().pipe(
        fLib.bigIntRange({
            gtEq : bigIntFactory("0"),
            ltEq : bigIntFactory("18446744073709551615"),
        })
    );
}