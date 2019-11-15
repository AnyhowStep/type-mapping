import {ParseResult} from "./try-parse";
import {getBigIntFactoryFunctionOrError} from "../type-util";
import * as BigIntUtil from "../bigint-util";

/**
 * Converts the fractional part to an integer part,
 * by lowering the exponent
 */
export function toIntegerAndExponent (
    arg : ParseResult
) : ParseResult {
    if (arg.fractionalPart == "0") {
        return arg;
    }

    const BigInt = getBigIntFactoryFunctionOrError();
    const exponentValue = BigIntUtil.sub(
        arg.exponentValue,
        BigInt(arg.fractionalPart.length)
    );
    const integerPart = (
        arg.integerPart + arg.fractionalPart
    );
    return {
        isNegative : arg.isNegative,
        integerPart,
        fractionalPart: "0",
        isZero : arg.isZero,
        exponentValue,
    };
}