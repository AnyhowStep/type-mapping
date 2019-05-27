import {UnionToIntersection} from "../type-util";

/**
    Replaces all elements of `arr` with `value`
*/
export function arrayFill<ArrT extends any[]> (arr : ArrT, value : UnionToIntersection<ArrT[number]>) {
    for (let i=0; i<arr.length; ++i) {
        arr[i] = value;
    }
    return arr;
}