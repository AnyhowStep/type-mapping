import {SafeMapperMap} from "../../field-map";
import {
    SafeMapper,
    AnySafeMapper,
    Name,
} from "../../mapper";
import { PartialObjectFromMapMapper, partialObjectFromMap } from "./partial-object-from-map";
import { PartialObjectFromArrayMapper, partialObjectFromArray } from "./partial-object-from-array";

export function partialObject<ArrT extends (AnySafeMapper & Name<string>)[]> (...arr : ArrT) : (
    PartialObjectFromArrayMapper<ArrT>
);
export function partialObject<
    MapT extends SafeMapperMap
> (
    map : MapT
) : (
    PartialObjectFromMapMapper<MapT>
);
export function partialObject (...arr : any[]) : SafeMapper<unknown> {
    if (arr.length == 1 && !(arr[0] instanceof Function)) {
        return partialObjectFromMap(arr[0]);
    } else {
        return partialObjectFromArray(...arr);
    }
}