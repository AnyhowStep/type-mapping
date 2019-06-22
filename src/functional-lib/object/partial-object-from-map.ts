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

/**
    https://github.com/microsoft/TypeScript/issues/31992#issuecomment-503816806
    We use this no-op `_` type as a hack to get the tooltip to give
    us a "better-looking" type
*/
type _<T> = T;
//https://github.com/microsoft/TypeScript/issues/31992#issuecomment-503816806
type OutputType<MapT extends SafeMapperMap, K extends keyof MapT=Extract<keyof MapT, string>> = (
    _<{
        [name in K] : (
            | OutputOf<MapT[name]>
            | undefined
        )
    }>
);
export type PartialObjectFromMapMapper<
    MapT extends SafeMapperMap
> = (
    & SafeMapper<OutputType<MapT>>
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