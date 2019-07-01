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
    getRunTimeRequiredFlagOrFalse,
    tryMapHandled,
} from "../../mapper";
import {instanceOfObject} from "./instance-of-object";
import {pipe} from "../operator";
import {toEmptyObject} from "./to-empty-object";
import {MappingError} from "../../mapping-error";
import {toPropertyAccess} from "../../string-util";
import {makeMappingError} from "../../error-util";

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
            OutputOf<MapT[name]>
        )
    }>
);
export type ObjectFromMapMapper<
    MapT extends SafeMapperMap
> = (
    & SafeMapper<OutputType<MapT>>
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
    const runTimeRequiredDict : { [k : string] : boolean|undefined } = {};
    for (const k of keys) {
        runTimeRequiredDict[k] = getRunTimeRequiredFlagOrFalse(map[k]);
    }
    return mapper<ObjectFromMapMapper<MapT>>(pipe(
        instanceOfObject(),
        (name : string, mixed : Object) => {
            const propertyErrors : MappingError[] = [];

            const result : any = {};
            for (const k of keys) {
                if (Object.prototype.hasOwnProperty.call(mixed, k) || runTimeRequiredDict[k] === false) {
                    const propertyResult = tryMapHandled(
                        map[k],
                        `${name}${toPropertyAccess(k)}`,
                        (mixed as any)[k]
                    );
                    if (propertyResult.success) {
                        result[k] = propertyResult.value;
                    } else {
                        propertyErrors.push(propertyResult.mappingError);
                    }
                } else {
                    propertyErrors.push(makeMappingError({
                        message : `${name}${toPropertyAccess(k)} must be explicitly set`,
                        inputName : `${name}${toPropertyAccess(k)}`,
                        actualValue : undefined,
                        expected : `explicitly set`,
                    }));
                }
            }
            if (propertyErrors.length == 0) {
                return result;
            } else {
                throw makeMappingError({
                    message : `${name} must be valid object`,
                    inputName : name,
                    actualValue : mixed,
                    expected : `valid object`,

                    propertyErrors,
                });
            }
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