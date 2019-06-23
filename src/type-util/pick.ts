/**
 * Performs `Pick<>` on an `object` during run-time
 *
 * @param obj - The object to pick key-value pairs from
 * @param keys - The keys to pick
 */
export function pick<ObjT, K extends Extract<keyof ObjT, string>> (
    obj : ObjT,
    ...keys : K[]
) : (
    Pick<ObjT, K>
) {
    const result : any = {};
    for (const k of keys) {
        if (!Object.prototype.hasOwnProperty.call(obj, k)) {
            continue;
        }
        result[k] = obj[k];
    }
    return result;
}