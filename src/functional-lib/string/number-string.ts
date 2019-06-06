import {SafeMapper} from "../../mapper";
import {pipe, cache} from "../operator";
import {finiteNumber, integer, unsignedInteger} from "../number";
import {toTrimmed, match} from "./string";

const floatingPointRegex = /^([-+])?([0-9]*\.?[0-9]+)([eE]([-+])?([0-9]+))?$/;
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
function parseFloatingPointString (str : string) {
    const m = floatingPointRegex.exec(str);
    if (m == undefined) {
        return undefined;
    }
    const rawCoefficientSign : string|undefined = m[1];
    const rawCoefficientValue : string = m[2];
    const rawExponentSign : string|undefined = m[4];
    const rawExponentValue : string|undefined = m[5];

    const decimalPlaceIndex = rawCoefficientValue.indexOf(".");
    const fractionalLength = (decimalPlaceIndex < 0) ?
        0 :
        rawCoefficientValue.length - decimalPlaceIndex - 1;

    const exponentValue = (rawExponentValue == undefined) ?
        0 :
        parseInt(rawExponentValue) * ((rawExponentSign === "-") ? -1 : 1);

    const normalizedFractionalLength = (fractionalLength - exponentValue);
    const isInteger = (normalizedFractionalLength <= 0) ?
        true :
        /^0+$/.test(rawCoefficientValue.substring(
            rawCoefficientValue.length-normalizedFractionalLength,
            rawCoefficientValue.length
        ));
    const isNeg = (rawCoefficientSign === "-");

    return {
        isInteger,
        isNeg,
    };
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
        (name : string, str) : string => {
            const parsed = parseFloatingPointString(str);
            if (parsed == undefined || !parsed.isInteger) {
                throw new Error(`${name} must be a valid integer format string`);
            }
            return str;
        }
    );
}
/**
    Just because a string is in unsigned number format does not mean
    it is a finite number.

    ```ts
    const nines_80 = "99999999999999999999999999999999999999999999999999999999999999999999999999999999";
    const nines_320 = nines_80.repeat(4);
    //This will pass, 320 nines in a row is a valid unsigned number format
    unsignedIntegerFormatString()("", nines_320);
    //Infinity
    parseFloat(nines_320);
    ```

    + This mapper will trim strings before checking.
    + This mapper allows scientific notation.
*/
export function unsignedIntegerFormatString () : SafeMapper<string> {
    return pipe(
        toTrimmed(),
        (name : string, str) : string => {
            const parsed = parseFloatingPointString(str);
            if (parsed == undefined || !parsed.isInteger || parsed.isNeg) {
                throw new Error(`${name} must be a valid unsigned integer format string`);
            }
            return str;
        }
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
    Uses `integerFormatString()` and `parseFloat()` internally.

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
                    `parseFloat(${name})`,
                    parseFloat(str)
                ).toString();
            }
        )
    );
}

/**
    Uses `unsignedIntegerString()` and `parseFloat()` internally.

    ```ts
    //Output is 10000000000000000 due to loss in precision
    integerString()("", "9999999999999999");
    ```
*/
export function unsignedIntegerString () : SafeMapper<string> {
    return pipe(
        unsignedIntegerFormatString(),
        cache(
            unsignedInteger(),
            (name : string, str : string, unsignedIntegerDelegate) => {
                return unsignedIntegerDelegate(
                    `parseFloat(${name})`,
                    parseFloat(str)
                ).toString();
            }
        )
    );
}
