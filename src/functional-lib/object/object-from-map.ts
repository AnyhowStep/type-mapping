import {
    SafeMapperMap,
    NonOptionalExpectedInputKey,
    OptionalExpectedInputKey,
    NonOptionalMappableInputKey,
    OptionalMappableInputKey,
} from "../../field-map";
import {
    SafeMapper,
    OutputOf,
    ExpectedInput,
    ExpectedInputOf,
    MappableInput,
    MappableInputOf,
    mapper,
    isOptional,
} from "../../mapper";
import {instanceOfObject} from "./instance-of-object";
import {pipe} from "../operator";
import {toEmptyObject} from "./to-empty-object";

export type ObjectFromMapMapper<
    MapT extends SafeMapperMap
> = (
    & SafeMapper<{
        [name in Extract<keyof MapT, string>] : (
            OutputOf<MapT[name]>
        )
    }>
    & ExpectedInput<
        & (
            NonOptionalExpectedInputKey<MapT> extends never ?
            unknown :
            {
                [name in NonOptionalExpectedInputKey<MapT>] : (
                    ExpectedInputOf<MapT[name]>
                )
            }
        )
        & (
            OptionalExpectedInputKey<MapT> extends never ?
            unknown :
            {
                [name in OptionalExpectedInputKey<MapT>]? : (
                    ExpectedInputOf<MapT[name]>
                )
            }
        )
    >
    & MappableInput<
        & (
            NonOptionalMappableInputKey<MapT> extends never ?
            unknown :
            {
                [name in NonOptionalMappableInputKey<MapT>] : (
                    MappableInputOf<MapT[name]>
                )
            }
        )
        & (
            OptionalMappableInputKey<MapT> extends never ?
            unknown :
            {
                [name in OptionalMappableInputKey<MapT>]? : (
                    MappableInputOf<MapT[name]>
                )
            }
        )
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
    const keys = Object.keys(map);
    if (keys.length == 0) {
        return toEmptyObject() as any;
    }
    const optionalDict : { [k : string] : boolean|undefined } = {};
    for (const k of keys) {
        optionalDict[k] = isOptional(map[k]);
    }
    return mapper<ObjectFromMapMapper<MapT>>(pipe(
        instanceOfObject(),
        (name : string, mixed : Object) => {
            const result : any = {};
            for (const k of keys) {
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