import {Field, field} from "../field";
import {RawFieldMap} from "./field-map";
import {OutputOf} from "../mapper";

/**
    Maps each `Mapper<>` to a `Field<>`
*/
export type ToFieldMap<MapT extends RawFieldMap> = {
    [name in Extract<keyof MapT, string>] : (
        Field<name, OutputOf<MapT[name]>>
    )
};

/**
    Constructs multiple `Field<>` instances at once.
*/
export function fields<MapT extends RawFieldMap>(
    map : MapT
) : (
    ToFieldMap<MapT>
) {
    const result : any = {};
    for (const name in map) {
        if (!map.hasOwnProperty(name)) {
            continue;
        }
        result[name] = field(name, map[name]);
    }
    return result;
}