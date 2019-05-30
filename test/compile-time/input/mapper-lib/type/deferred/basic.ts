import * as tm from "../../../../../../dist";

interface Recursive {
    value : number,
    child? : Recursive,
}
const recursiveDeferred = tm.deferred<Recursive>();
export const recursive = tm.object({
    value : tm.finiteNumber(),
    child : tm.optional(recursiveDeferred),
});
recursiveDeferred.setImplementation(recursive);

export const r : Recursive = recursive("", "");
export const r2 : tm.ExpectedInputOf<typeof recursive> = r;