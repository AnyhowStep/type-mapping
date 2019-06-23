/**
 * Performs `Omit<>` on an `object` during run-time
 *
 * @param obj - The object to omit key-value pairs from
 * @param keys - The keys to omit
 */
export function omit<ObjT, K extends Extract<keyof ObjT, string>> (
    obj : ObjT,
    ...keys : K[]
) : (
    Omit<ObjT, K>
) {
    const result = {...obj};
    for (const k of keys) {
        delete result[k];
    }
    return result;
}