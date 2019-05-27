import {floatingPointFormatString, integerFormatString, naturalNumberFormatString} from "../string";
import {cast, or, pipe} from "../operator";
import {finiteNumber, integer, naturalNumber} from "./number";
import {bigInt} from "../bigint/bigint";

/**
    Uses `floatingPointFormatString()` and `parseFloat()` internally.

    ```ts
    const s = "999999999999999999999999999"
    //Output is "1e+27" due to loss in precision
    stringToFiniteNumber("", s).toString()
    ```
*/
export function stringToFiniteNumber () {
    return cast(
        floatingPointFormatString(),
        parseFloat,
        finiteNumber()
    );
}

/**
    Uses `integerFormatString()` and `parseInt()` internally.

    ```ts
    const s = "999999999999999999999999999"
    //Output is "1e+27" due to loss in precision
    stringToInteger("", s).toString()
    ```
*/
export function stringToInteger () {
    return cast(
        integerFormatString(),
        parseInt,
        integer()
    );
}

/**
    Uses `naturalNumberFormatString()` and `parseInt()` internally.

    ```ts
    const s = "999999999999999999999999999"
    //Output is "1e+27" due to loss in precision
    stringToNaturalNumber("", s).toString()
    ```
*/
export function stringToNaturalNumber () {
    return cast(
        naturalNumberFormatString(),
        parseInt,
        naturalNumber()
    );
}

/**
    Uses `floatingPointFormatString()` and `parseFloat()` internally.

    ```ts
    const s = "999999999999999999999999999"
    //Output is "1e+27" due to loss in precision
    toFiniteNumber("", s).toString()
    ```

    -----

    ```ts
    const b = BigInt("999999999999999999999999999")
    //Output is "1e+27" due to loss in precision
    toFiniteNumber("", b).toString()
    ```
*/
export function toFiniteNumber () {
    return cast(
        or(
            floatingPointFormatString(),
            pipe(
                bigInt(),
                (_name : string, b : bigint) => {
                    return b.toString();
                }
            )
        ),
        parseFloat,
        finiteNumber()
    );
}

/**
    Uses `integerFormatString()` and `parseInt()` internally.

    ```ts
    const s = "999999999999999999999999999"
    //Output is "1e+27" due to loss in precision
    toInteger("", s).toString()
    ```

    -----

    ```ts
    const b = BigInt("999999999999999999999999999")
    //Output is "1e+27" due to loss in precision
    toInteger("", b).toString()
    ```
*/
export function toInteger () {
    return cast(
        or(
            integerFormatString(),
            pipe(
                bigInt(),
                (_name : string, b : bigint) => {
                    return b.toString();
                }
            )
        ),
        parseInt,
        integer()
    );
}

/**
    Uses `naturalNumberFormatString()` and `parseInt()` internally.

    ```ts
    const s = "999999999999999999999999999"
    //Output is "1e+27" due to loss in precision
    toNaturalNumber("", s).toString()
    ```

    -----

    ```ts
    const b = BigInt("999999999999999999999999999")
    //Output is "1e+27" due to loss in precision
    toNaturalNumber("", b).toString()
    ```
*/
export function toNaturalNumber () {
    return cast(
        or(
            naturalNumberFormatString(),
            pipe(
                bigInt(),
                (_name : string, b : bigint) => {
                    return b.toString();
                }
            )
        ),
        parseInt,
        naturalNumber()
    );
}