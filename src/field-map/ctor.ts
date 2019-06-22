import {SafeMapperMap} from "./field-map";
import {withName, WithName} from "../mapper";

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
            WithName<MapT[name], Extract<name, string>>
        )
    }>
);

/**
    Maps each `Mapper<>` to a `Field<>`
*/
export type ToFieldMap<MapT extends SafeMapperMap> = OutputType<MapT>;

/**
    Constructs multiple `Field<>` instances at once.
*/
export function fields<MapT extends SafeMapperMap>(
    map : MapT
) : (
    ToFieldMap<MapT>
) {
    const result : any = {};
    for (const name in map) {
        if (!map.hasOwnProperty(name)) {
            continue;
        }
        result[name] = withName(map[name], name);
    }
    return result;
}