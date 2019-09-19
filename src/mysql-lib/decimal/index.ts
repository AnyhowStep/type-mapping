import {SafeMapper, ExpectedInput, MappableInput} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {
    or,
    string,
    finiteNumber,
    bigInt,
    floatingPointFormatString,
} from "../../functional-lib";
import {
    pipe,
} from "../../fluent-lib";

/**
 * This interface represents a SQL `DECIMAL` type.
 *
 * JavaScript does not have a built-in arbitrary precision decimal type.
 * So, we make do with a minimal interface.
 */
export interface Decimal {
    /**
     * This is the only method a `DECIMAL` type is expected to have.
     * You may use the string representation to convert to a `number|string|bigint`,
     * or use a library implementing arbitrary precision decimal types.
     */
    toString () : string;
    /**
     * A brand that marks this as a SQL `DECIMAL` type.
     * This property will not exist during run-time.
     */
    $isDecimal : void;
}

/*
    For now, returns a string.
    Converting to a number risks losing precision.
*/
export function decimal () : (
    FluentMapper<
        & SafeMapper<Decimal>
        & ExpectedInput<Decimal>
        & MappableInput<Decimal | number | bigint | string>
    >
) {
    return pipe(
        or(
            string(),
            finiteNumber(),
            bigInt()
        ) as SafeMapper<string|number|bigint|Decimal>,
        (_name : string, mixed : { toString : () => string }) : string => {
            return mixed.toString();
        },
        floatingPointFormatString() as SafeMapper<{ toString : () => string }> as SafeMapper<Decimal>
    );
}
