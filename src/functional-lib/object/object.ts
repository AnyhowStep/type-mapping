import {SafeMapperMap} from "../../field-map";
import {
    SafeMapper,
    AnySafeMapper,
    Name,
} from "../../mapper";
import {ObjectFromMapMapper, objectFromMap} from "./object-from-map";
import {ObjectFromArrayMapper, objectFromArray} from "./object-from-array";

export function object<ArrT extends (AnySafeMapper & Name<string>)[]> (...arr : ArrT) : (
    ObjectFromArrayMapper<ArrT>
);
export function object<
    MapT extends SafeMapperMap
> (
    map : MapT
) : (
    ObjectFromMapMapper<MapT>
);
export function object (...arr : any[]) : SafeMapper<unknown> {
    if (arr.length == 1 && !(arr[0] instanceof Function)) {
        return objectFromMap(arr[0]);
    } else {
        return objectFromArray(...arr);
    }
}