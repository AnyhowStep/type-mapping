import {isBigInt} from "./is-bigint";
import {isBigIntNativelySupported} from "./try-get-bigint-factory-function";

function strictEqualNative (a : unknown, b : unknown) : boolean {
    return (a === b);
}
function strictEqualPolyfill (a : unknown, b : unknown) : boolean {
    if (a === b) {
        return true;
    }

    if (isBigInt(a) && isBigInt(b)) {
        return a.toString() === b.toString();
    }

    return false;
}
/**
    This library supports `bigint`.
    However, not all browsers support `bigint`.

    Some developers may polyfill it with a `BigInt` class.

    ```ts
    //With polyfill, this may be false
    BigInt(2) === BigInt(2)
    ```

    ```ts
    //We want a special case for `BigInt`
    //This must be true
    strictEqual(BigInt(2), BigInt(2))
    ```
*/
export function strictEqual (a : unknown, b : unknown) : boolean {
    if (isBigIntNativelySupported()) {
        return strictEqualNative(a, b);
    } else {
        return strictEqualPolyfill(a, b);
    }
}