import {strictEqual} from "../type-util";

/**
 * Removes duplicates from `arr`.
 * Preserves the order of elements.
 *
 * A "duplicate" is an element that is `===` to another element
 * with a lower index in `arr`.
 *
 * Given the following,
 * ```ts
 * [1,2,1]
 * ```
 * The first `1` is **NOT** a duplicate.
 * The second `1` is a duplicate.
 *
 * @param arr
 */
export function removeDuplicateElements<T> (arr : T[]) : T [] {
    const result : T[] = [];

    for (const element of arr) {
        if (result.some(r => strictEqual(r, element))) {
            continue;
        }
        result.push(element);
    }

    return result;
}