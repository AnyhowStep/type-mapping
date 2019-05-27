import {integerFormatString, naturalNumberFormatString} from "../string";
import {cast, or} from "../operator";
import {bigInt, naturalBigInt} from "./bigint";
import {getBigIntFactoryFunctionOrError} from "../../type-util";
import {integer, naturalNumber} from "../number";

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
    Uses `naturalNumberFormatString()` and `BigInt()` internally.
*/
export function stringToNaturalBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        naturalNumberFormatString(),
        bigIntFactory,
        naturalBigInt()
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

export function naturalNumberToNaturalBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        naturalNumber(),
        bigIntFactory,
        naturalBigInt()
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
    Uses `naturalNumberFormatString()` and `BigInt()` internally.
*/
export function toNaturalBigInt () {
    const bigIntFactory = getBigIntFactoryFunctionOrError();
    return cast(
        or(
            naturalNumberFormatString(),
            naturalNumber()
        ),
        bigIntFactory,
        naturalBigInt()
    );
}