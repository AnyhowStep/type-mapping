import {SafeMapperMap} from "../../field-map";
import {SafeMapper} from "../../mapper";
import {OutputOf} from "../../mapper";
import {ExpectedInput} from "../../mapper";
import {ExpectedInputOf} from "../../mapper";
import {MappableInput} from "../../mapper";
import {MappableInputOf} from "../../mapper";
import {mapper} from "../../mapper";
import {instanceOfObject} from "./instance-of-object";
import {pipe} from "../operator";
import {IsExpectedInputOptional, isOptional, IsOptional} from "../../mapper/predicate";

export type ObjectFromMapMapper<
    MapT extends SafeMapperMap
> = (
    & SafeMapper<{
        [name in Extract<keyof MapT, string>] : (
            OutputOf<MapT[name]>
        )
    }>
    & ExpectedInput<
        & {
            [name in {
                [k in Extract<keyof MapT, string>] : (
                    IsExpectedInputOptional<MapT[k]> extends true ?
                    never :
                    k
                )
            }[Extract<keyof MapT, string>]] : (
                ExpectedInputOf<MapT[name]>
            )
        }
        & {
            [name in {
                [k in Extract<keyof MapT, string>] : (
                    IsExpectedInputOptional<MapT[k]> extends true ?
                    k :
                    never
                )
            }[Extract<keyof MapT, string>]]? : (
                ExpectedInputOf<MapT[name]>
            )
        }
    >
    & MappableInput<
        & {
            [name in {
                [k in Extract<keyof MapT, string>] : (
                    IsOptional<MapT[k]> extends true ?
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
                    IsOptional<MapT[k]> extends true ?
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
export function objectFromMap<
    MapT extends SafeMapperMap
> (
    map : MapT
) : (
    ObjectFromMapMapper<MapT>
) {
    const optionalDict : { [k : string] : boolean|undefined } = {};
    for (const k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        optionalDict[k] = isOptional(map[k]);
    }
    return mapper<ObjectFromMapMapper<MapT>>(pipe(
        instanceOfObject(),
        (name : string, mixed : Object) => {
            const result : any = {};
            for (const k in map) {
                if (!map.hasOwnProperty(k)) {
                    continue;
                }
                if (mixed.hasOwnProperty(k) || optionalDict[k] === true) {
                    result[k] = map[k](
                        `${name}.${k}`,
                        (mixed as any)[k]
                    );
                } else {
                    throw new Error(`${name} must have property ${k}`);
                }
            }
            return result;
        }
    ));
}

/*
import {optional, orUndefined} from "../operator";
import {unsignedInteger} from "../number";

const m = objectFromMap({
    shouldBeOptional : optional(unsignedInteger()),
    shouldNotBeOptional : orUndefined(unsignedInteger())
});
m.__expectedInput
m.__mappableInput


declare const map2 : {

    [name : string] : SafeMapper<number>|SafeMapper<boolean>
};
const m2 = objectFromMap(map2);
m2.__expectedInput
m2.__mappableInput


declare const map3 : {
    k : SafeMapper<number>|SafeMapper<boolean>,
    l : SafeMapper<number>,
};
const m3 = objectFromMap(map3);
m3.__expectedInput
m3.__mappableInput
//*/