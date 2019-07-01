import {MappingError} from "../mapping-error";

export function flattenUnionErrors (arr : MappingError[]) : MappingError[] {
    const result : MappingError[] = [];
    for (const err of arr) {
        if (err.unionErrors == undefined || err.unionErrors.length == 0) {
            result.push(err);
        } else {
            result.push(...flattenUnionErrors(err.unionErrors));
        }
    }
    return result;
}