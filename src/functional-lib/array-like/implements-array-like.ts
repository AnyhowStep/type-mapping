import {SafeMapper} from "../../mapper";
import {length} from "./length";

/**
    With this, a `string` will pass the check.

    ```ts
    const x : ArrayLike<string> = "test";
    console.log(x[0]);
    ```
*/
export function implementsArrayLike () : SafeMapper<ArrayLike<unknown>> {
    return length({});
}