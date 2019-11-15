import {SafeMapper} from "../../mapper";
import {pipe} from "../operator";
import {finiteNumber, integer, unsignedInteger} from "../number";
import {toTrimmed, match} from "./string";
import { makeMappingError } from "../../error-util";
import * as FixedPointUtil from "../../fixed-point-util";
import * as FloatingPointUtil from "../../floating-point-util";

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
        match(FloatingPointUtil.floatingPointRegex, name => {
            return {
                message : `${name} must be valid floating point format string`,
                expected : `valid floating point format string`,
            };
        })
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
        (name : string, str) : string => {
            const parsed = FixedPointUtil.tryParse(str);
            if (parsed == undefined || !parsed.isInteger) {
                throw makeMappingError({
                    message : `${name} must be a valid integer format string`,
                    inputName : name,
                    actualValue : str,
                    expected : `valid integer format string`,
                });
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
            const parsed = FixedPointUtil.tryParse(str);
            if (parsed == undefined || !parsed.isInteger || parsed.isNegative) {
                throw makeMappingError({
                    message : `${name} must be a valid unsigned integer format string`,
                    inputName : name,
                    actualValue : str,
                    expected : `valid unsigned integer format string`,
                });
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
    const finiteNumberDelegate = finiteNumber();
    return pipe(
        floatingPointFormatString(),
        (name : string, str : string) => {
            return finiteNumberDelegate(
                `parseFloat(${name})`,
                parseFloat(str)
            ).toString();
        }
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
    const integerDelegate = integer();
    return pipe(
        integerFormatString(),
        (name : string, str : string) => {
            return integerDelegate(
                `parseFloat(${name})`,
                parseFloat(str)
            ).toString();
        }
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
    const unsignedIntegerDelegate = unsignedInteger();
    return pipe(
        unsignedIntegerFormatString(),
        (name : string, str : string) => {
            return unsignedIntegerDelegate(
                `parseFloat(${name})`,
                parseFloat(str)
            ).toString();
        }
    );
}
