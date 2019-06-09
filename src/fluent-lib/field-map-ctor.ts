import {SafeMapperMap} from "../field-map";
import {WithName} from "../mapper";
import {fluentMapper, FluentMapper} from "../fluent-mapper";

/**
    Maps each `Mapper<>` to a `Field<>`,
    that is also a `FluentMapper<>`
*/
export type ToFluentFieldMap<MapT extends SafeMapperMap> = {
    [name in Extract<keyof MapT, string>] : (
        FluentMapper<WithName<MapT[name], name>>
    )
};

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