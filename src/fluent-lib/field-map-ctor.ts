import {SafeMapperMap} from "../field-map";
import {WithName} from "../mapper";
import {fluentMapper, FluentMapper} from "../fluent-mapper";

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
            FluentMapper<WithName<MapT[name], Extract<name, string>>>
        )
    }>
);

/**
    Maps each `Mapper<>` to a `Field<>`,
    that is also a `FluentMapper<>`
*/
export type ToFluentFieldMap<MapT extends SafeMapperMap> = OutputType<MapT>;

/**
    Constructs multiple `Field<>` instances at once,
    that are also `FluentMapper<>` instances
*/
export function fields<MapT extends SafeMapperMap>(
    map : MapT
) : (
    ToFluentFieldMap<MapT>
) {
    const result : any = {};
    for (const name in map) {
        if (!map.hasOwnProperty(name)) {
            continue;
        }
        result[name] = fluentMapper(map[name]).withName(name);
    }
    return result;
}