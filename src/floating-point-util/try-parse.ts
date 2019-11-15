import {getBigIntFactoryFunctionOrError} from "../type-util";
import * as BigIntUtil from "../bigint-util";

export const floatingPointRegex = /^([-+])?([0-9]*\.?[0-9]+)([eE]([-+])?([0-9]+))?$/;

export interface ParseResult {
    /**
     * Tells you if the number is positive or negative
     */
    isNegative: boolean,
    /**
     * All leading zeroes are trimmed.
     * If the numeric value is zero, this is the string `"0"`.
     */
    integerPart: string,
    /**
     * All trailing zeroes are trimmed.
     * If the numeric value is zero, this is the string `"0"`.
     */
    fractionalPart: string,
    /**
     * Tells you if this number is zero
     */
    isZero: boolean,
    /**
     * This value may be very small, or very large.
     * It may also just be zero.
     */
    exponentValue: bigint,
}

export function tryParse (str: string) : undefined|ParseResult {
    const m = floatingPointRegex.exec(str);
    if (m == undefined) {
        return undefined;
    }
    //-123.456e+789
    //~
    const rawCoefficientSign: string | undefined = m[1];
    //-123.456e+789
    // ~~~~~~~
    const rawCoefficientValue: string = m[2];
    //-123.456e+789
    //         ~
    const rawExponentSign: string | undefined = m[4];
    //-123.456e+789
    //          ~~~
    const rawExponentValue: string | undefined = m[5];

    const rawDecimalPlaceIndex = rawCoefficientValue.indexOf(".");

    const rawIntegerPart = (
        rawDecimalPlaceIndex < 0 ?
        rawCoefficientValue :
        rawCoefficientValue.substring(0, rawDecimalPlaceIndex)
    );
    const rawFractionalPart = (
        rawDecimalPlaceIndex < 0 ?
        "" :
        rawCoefficientValue.substring(
            rawDecimalPlaceIndex + 1,
            rawCoefficientValue.length
        )
    );

    const trimmedIntegerPart = rawIntegerPart.replace(/^(0+)/, "");
    const integerPart = (
        trimmedIntegerPart == "" ?
        "0" :
        trimmedIntegerPart
    );

    const trimmedFractionalPart = rawFractionalPart.replace(/(0+)$/, "");
    const fractionalPart = (
        trimmedFractionalPart == "" ?
        "0" :
        trimmedFractionalPart
    );

    const isZero = (integerPart == "0" && fractionalPart == "0");

    const BigInt = getBigIntFactoryFunctionOrError();
    const exponentValue = (
        isZero ?
        BigInt(0) :
        rawExponentValue == undefined ?
        BigInt(0) :
        BigIntUtil.mul(
            BigInt(rawExponentValue),
            BigInt(
                (rawExponentSign === "-") ?
                -1 :
                1
            )
        )
    );
    return {
        isNegative : (rawCoefficientSign === "-"),
        integerPart,
        fractionalPart,
        isZero,
        exponentValue,
    }
}
