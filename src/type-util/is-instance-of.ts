import {isBigIntNativelySupported} from "./try-get-bigint-factory-function";
import {isBigInt} from "./is-bigint";

/**
    Like using "regular" `instanceof` but
    bigint polyfill objects will never be an `instanceof Object`,
    or any other class.
*/
export function isInstanceOf<T> (
    mixed : unknown,
    ctor : new (...args : any[]) => T
) : mixed is T {
    return (
        (mixed instanceof ctor) &&
        (
            isBigIntNativelySupported() ||
            !isBigInt(mixed)
        )
    );
}