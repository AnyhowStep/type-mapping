import {
    SafeMapperMap,
} from "../../field-map";
import {
    SafeMapper,
    OutputOf,
    ExpectedInput,
    ExpectedInputOf,
    MappableInput,
    MappableInputOf,
    mapper,
    AnySafeMapper,
} from "../../mapper";
import {instanceOfObject} from "./instance-of-object";
import {pipe, optional} from "../operator";
import {toEmptyObject} from "./to-empty-object";

export type PartialObjectFromMapMapper<
    MapT extends SafeMapperMap
> = (
    & SafeMapper<{
        [name in Extract<keyof MapT, string>] : (
            | OutputOf<MapT[name]>
            | undefined
        )
    }>
    & ExpectedInput<
        {
            [name in Extract<keyof MapT, string>]? : (
                | ExpectedInputOf<MapT[name]>
                | undefined
            )
        }
    >
    & MappableInput<
        {
            [name in Extract<keyof MapT, string>]?  : (
                | MappableInputOf<MapT[name]>
                | undefined
            )
        }
    >
);

/**
    Always returns a new object.

    If the input contains additional fields not part
    of the map, they will not be in the new object.

    -----

    All input fields are optional.
    All output fields may be undefined.
*/
export function partialObjectFromMap<
    MapT extends SafeMapperMap
> (
    map : MapT
) : (
    PartialObjectFromMapMapper<MapT>
) {
    const keys = Object.keys(map);
    if (keys.length == 0) {
        return toEmptyObject() as any;
    }
    const partialMap : {
        [k:string] : AnySafeMapper
    } = {};
    for (const k of keys) {
        partialMap[k] = optional(map[k]);
    }
    return mapper<PartialObjectFromMapMapper<MapT>>(pipe(
        instanceOfObject(),
        (name : string, mixed : Object) => {
            const result : any = {};
            for (const k of keys) {
                result[k] = partialMap[k](
                    `${name}.${k}`,
                    (mixed as any)[k]
                );
            }
            return result;
        }
    ));
}