import {integerFormatString, unsignedIntegerFormatString} from "../string";
import {cast, or} from "../operator";
import {bigInt, unsignedBigInt} from "./bigint";
import {getBigIntFactoryFunctionOrError} from "../../type-util";
import {integer, unsignedInteger} from "../number";

/**
    Uses `integerFormatString()` and `BigInt()` internally.
*/
export function stringToBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        integerFormatString(),
        bigIntFactory,
        bigInt()
    );
}

/**
    Uses `unsignedIntegerFormatString()` and `BigInt()` internally.
*/
export function stringToUnsignedBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        unsignedIntegerFormatString(),
        bigIntFactory,
        unsignedBigInt()
    );
}

export function integerToBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        integer(),
        bigIntFactory,
        bigInt()
    );
}

export function unsignedIntegerToUnsignedBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        unsignedInteger(),
        bigIntFactory,
        unsignedBigInt()
    );
}

/**
    Uses `integerFormatString()` and `BigInt()` internally.
*/
export function toBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        or(
            integerFormatString(),
            integer()
        ),
        bigIntFactory,
        bigInt()
    );
}

/**
    Uses `unsignedIntegerFormatString()` and `BigInt()` internally.
*/
export function toUnsignedBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        or(
            unsignedIntegerFormatString(),
            unsignedInteger()
        ),
        bigIntFactory,
        unsignedBigInt()
    );
}