/**
 * Attempts to convert `x` into a `number`
 * without any loss in precision.
 *
 * If it is not possible, an error is thrown.
 *
 * -----
 *
 * In general, this should not happen if our `bigint` is
 * in the range,
 *
 * `[Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]`
 *
 * Which is,
 *
 * `[-9007199254740991, 9007199254740991]`
 *
 * @param x - The `bigint` to convert to a `number`
 */
export function toNumber (x : bigint) : number {
    const result = Number(x);
    if (x.toString() === result.toString()) {
        return result;
    } else {
        throw new Error(`Cannot convert bigint to number without loss in precision`);
    }
}