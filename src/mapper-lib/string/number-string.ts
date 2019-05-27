import {SafeMapper} from "../../mapper";
import {pipe, cache} from "../operator";
import {finiteNumber, integer, naturalNumber} from "../number";
import {toTrimmed, match} from "./string";

const floatingPointRegex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
const integerRegex = /^[-+]?[0-9]+([eE][-+]?[0-9]+)?$/;
const naturalNumberRegex = /^[+]?[0-9]+([eE][-+]?[0-9]+)?$/;
/**
    Just because a string is in floating point format does not mean
    it is a finite number.

    ```ts
    const nines_80 = "99999999999999999999999999999999999999999999999999999999999999999999999999999999";
    const nines_320 = nines_80.repeat(4);
    //This will pass, 320 nines in a row is a valid floating point format
    floatingPointFormatString()("", nines_320);
    //Infinity
    parseFloat(nines_320);
    ```

    + This mapper will trim strings before checking.
*/
export function floatingPointFormatString () : SafeMapper<string> {
    return pipe(
        toTrimmed(),
        match(floatingPointRegex, name => `${name} must be valid floating point format string`)
    );
}
/**
    Just because a string is in integer format does not mean
    it is a finite number.

    ```ts
    const nines_80 = "99999999999999999999999999999999999999999999999999999999999999999999999999999999";
    const nines_320 = nines_80.repeat(4);
    //This will pass, 320 nines in a row is a valid integer format
    integerFormatString()("", nines_320);
    //Infinity
    parseFloat(nines_320);
    ```

    + This mapper will trim strings before checking.
    + This mapper allows scientific notation.
*/
export function integerFormatString () : SafeMapper<string> {
    return pipe(
        toTrimmed(),
        match(integerRegex, name => `${name} must be valid integer format string`)
    );
}
/**
    Just because a string is in natural number format does not mean
    it is a finite number.

    ```ts
    const nines_80 = "99999999999999999999999999999999999999999999999999999999999999999999999999999999";
    const nines_320 = nines_80.repeat(4);
    //This will pass, 320 nines in a row is a valid natural number format
    naturalNumberFormatString()("", nines_320);
    //Infinity
    parseFloat(nines_320);
    ```

    + This mapper will trim strings before checking.
    + This mapper allows scientific notation.
*/
export function naturalNumberFormatString () : SafeMapper<string> {
    return pipe(
        toTrimmed(),
        match(naturalNumberRegex, name => `${name} must be valid natural number format string`)
    );
}

/**
    Uses `floatingPointFormatString()` and `parseFloat()` internally.

    ```ts
    //Output is 10000000000000000 due to loss in precision
    finiteNumberString()("", "9999999999999999");
    ```
*/
export function finiteNumberString () : SafeMapper<string> {
    return pipe(
        floatingPointFormatString(),
        cache(
            finiteNumber(),
            (name : string, str : string, finiteNumberDelegate) => {
                return finiteNumberDelegate(
                    `parseFloat(${name})`,
                    parseFloat(str)
                ).toString();
            }
        )
    );
}

/**
    Uses `integerFormatString()` and `parseInt()` internally.

    ```ts
    //Output is 10000000000000000 due to loss in precision
    integerString()("", "9999999999999999");
    ```
*/
export function integerString () : SafeMapper<string> {
    return pipe(
        integerFormatString(),
        cache(
            integer(),
            (name : string, str : string, integerDelegate) => {
                return integerDelegate(
                    `parseInt(${name})`,
                    parseInt(str)
                ).toString();
            }
        )
    );
}

/**
    Uses `naturalNumberString()` and `parseInt()` internally.

    ```ts
    //Output is 10000000000000000 due to loss in precision
    integerString()("", "9999999999999999");
    ```
*/
export function naturalNumberString () : SafeMapper<string> {
    return pipe(
        naturalNumberString(),
        cache(
            naturalNumber(),
            (name : string, str : string, naturalNumberDelegate) => {
                return naturalNumberDelegate(
                    `parseInt(${name})`,
                    parseInt(str)
                ).toString();
            }
        )
    );
}
