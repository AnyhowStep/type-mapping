import {SafeMapperMap} from "./field-map";
import {withName, WithName} from "../mapper";

/**
    Maps each `Mapper<>` to a `Field<>`
*/
export type ToFieldMap<MapT extends SafeMapperMap> = {
    [name in Extract<keyof MapT, string>] : (
        WithName<MapT[name], name>
    )
};

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