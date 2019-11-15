import {SafeMapper, ExpectedInput, MappableInput} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import {
    or,
    string,
    finiteNumber,
    bigInt,
    floatingPointFormatString,
    toBigInt,
    bigIntGtEq,
    bigIntLtEq,
} from "../../functional-lib";
import {
    pipe,
} from "../../fluent-lib";
import {getBigIntFactoryFunctionOrError} from "../../type-util";
import * as FixedPointUtil from "../../fixed-point-util";
import * as BigIntUtil from "../../bigint-util";
import {makeMappingError} from "../../error-util";

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

/**
 *
 * For now, returns a string.
 * Converting to a number risks losing precision.
 *
 * @deprecated
 */
export function decimalDeprecated () : (
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

function assertValidDecimalPrecisionAndScale (
    /**
     * + Min precision is `1`, even though MySQL allows min precision `0`.
     *   Precision `0` is not very meaningful, anyway, right?
     */
    precision : number|bigint,
    /**
     * + The min scale is `0`.
     * + `scale` must be <= `precision`.
     */
    scale : number|bigint
) {
    const BigInt = getBigIntFactoryFunctionOrError();
    const precisionMapper = pipe(
        toBigInt(),
        bigIntGtEq(BigInt(1))
    );
    precision = precisionMapper("precision", precision);
    const scaleMapper = pipe(
        toBigInt(),
        bigIntGtEq(BigInt(0)),
        bigIntLtEq(precision)
    );
    scale = scaleMapper("scale", scale);
    return {
        precision,
        scale,
    };
}

/**
 *
 * For now, returns a string.
 * Converting to a number risks losing precision.
 *
 * @deprecated
 */
export function decimal () : (
    FluentMapper<
        & SafeMapper<Decimal>
        & ExpectedInput<Decimal>
        & MappableInput<Decimal | number | bigint | string>
    >
);
/**
 *
 * For now, returns a string.
 * Converting to a number risks losing precision.
 */
export function decimal (
    /**
     * + Min precision is `1`, even though MySQL allows min precision `0`.
     *   Precision `0` is not very meaningful, anyway, right?
     */
    precision : number|bigint,
    /**
     * + The min scale is `0`.
     * + `scale` must be <= `precision`.
     */
    scale : number|bigint
) : (
    FluentMapper<
        & SafeMapper<Decimal>
        & ExpectedInput<Decimal>
        & MappableInput<Decimal | number | bigint | string>
    >
);
export function decimal (precision? : number|bigint, scale? : number|bigint) : (
    FluentMapper<
        & SafeMapper<Decimal>
        & ExpectedInput<Decimal>
        & MappableInput<Decimal | number | bigint | string>
    >
) {
    if (precision == undefined) {
        return decimalDeprecated();
    }

    const {
        precision : maxPrecision,
        scale : maxScale,
    } = assertValidDecimalPrecisionAndScale(
        precision,
        scale as any
    );
    const expected = `DECIMAL(${maxPrecision}, ${maxScale})`;

    return pipe(
        or(
            string(),
            finiteNumber(),
            bigInt()
        ) as SafeMapper<string|number|bigint|Decimal>,
        (_name : string, mixed : { toString : () => string }) : string => {
            return mixed.toString();
        },
        (name : string, str : string) : Decimal => {
            const parsed = FixedPointUtil.tryParse(str);
            if (parsed == undefined) {
                throw makeMappingError({
                    message : `${name} must be ${expected}`,
                    inputName : name,
                    actualValue : str,
                    expected,
                });
            }
            const curScale = (
                parsed.getFixedPointFractionalPartString() == "0" ?
                0 :
                parsed.getFixedPointFractionalPartString().length
            );
            const curPrecision = (
                curScale +
                (
                    parsed.getFixedPointIntegerPartString() == "0" ?
                    0 :
                    parsed.getFixedPointIntegerPartString().length
                )
            );
            if (BigIntUtil.greaterThan(curPrecision, maxPrecision)) {
                throw makeMappingError({
                    message : `${name} must have precision less than ${maxPrecision}`,
                    inputName : name,
                    actualValue : parsed.getFixedPointString(),
                    expected,
                    /**
                     * @todo An `errorCode`
                     */
                    expectedMeta : {
                        maxPrecision,
                        maxScale,
                        curPrecision,
                        curScale,
                    },
                });
            }
            if (BigIntUtil.greaterThan(curScale, maxScale)) {
                throw makeMappingError({
                    message : `${name} must have scale less than ${maxScale}`,
                    inputName : name,
                    actualValue : parsed.getFixedPointString(),
                    expected,
                    /**
                     * @todo An `errorCode`
                     */
                    expectedMeta : {
                        maxPrecision,
                        maxScale,
                        curPrecision,
                        curScale,
                    },
                });
            }

            return parsed.getFixedPointString() as { toString () : string } as Decimal;
        }
    );
}