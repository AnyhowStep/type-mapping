import {RawFieldMap} from "../../field-map";
import {SafeMapper} from "../../mapper";
import {OutputOf} from "../../mapper";
import {ExpectedInput} from "../../mapper";
import {ExpectedInputOf} from "../../mapper";
import {MappableInput} from "../../mapper";
import {MappableInputOf} from "../../mapper";
import {mapper} from "../../mapper";
import {instanceOfObject} from "./instance-of-object";
import {pipe} from "../operator";

export type ObjectMapper<
    MapT extends RawFieldMap
> = (
    & SafeMapper<{
        [name in Extract<keyof MapT, string>] : (
            OutputOf<MapT[name]>
        )
    }>
    & ExpectedInput<{
        [name in Extract<keyof MapT, string>] : (
            ExpectedInputOf<MapT[name]>
        )
    }>
    & MappableInput<
        & {
            [name in {
                [k in Extract<keyof MapT, string>] : (
                    undefined extends MappableInputOf<MapT[k]> ?
                        never :
                        k
                )
            }[Extract<keyof MapT, string>]] : (
                MappableInputOf<MapT[name]>
            )
        }
        & {
            [name in {
                [k in Extract<keyof MapT, string>] : (
                    undefined extends MappableInputOf<MapT[k]> ?
                        k :
                        never
                )
            }[Extract<keyof MapT, string>]]? : (
                MappableInputOf<MapT[name]>
            )
        }
    >
);

/**
    Always returns a new object.

    If the input contains additional fields not part
    of the map, they will not be in the new object.
*/
export function object<
    MapT extends RawFieldMap
> (
    map : MapT
) : (
    ObjectMapper<MapT>
) {
    return mapper<ObjectMapper<MapT>>(pipe(
        instanceOfObject(),
        (name : string, mixed : Object) => {
            const result : any = {};
            for (const k in map) {
                if (!map.hasOwnProperty(k)) {
                    continue;
                }
                result[k] = map[k](
                    `${name}.${k}`,
                    (mixed as any)[k]
                );
            }
            return result;
        }
    ));
}