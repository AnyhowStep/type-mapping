import {
    FieldMap,
    ExtractLiteralDstName,
} from "../../field-map";
import {
    SafeMapper,
    ExpectedInput,
    OutputOf,
    ExpectedInputOf,
    MappableInputOf,
    MappableInput,
    MergedOutputOf,
    getNameOrEmptyString,
    Name,
} from "../../mapper";
import {unsafeDeepMerge, optional} from "../operator";
import {derive} from "./derive";
import {toEmptyObject} from "./to-empty-object";

export type PartialDeriveMapMapper<MapT extends FieldMap> = (
    & SafeMapper<
        & {
            [dst in ExtractLiteralDstName<MapT>] : (
                | MergedOutputOf<
                    Extract<
                        MapT[Extract<keyof MapT, string>],
                        Name<dst>
                    >
                >
                | undefined
            )
        }
        & (
            string extends MapT[Extract<keyof MapT, string>]["__name"] ?
            {
                [name : string] : (
                    | OutputOf<
                        Exclude<MapT[Extract<keyof MapT, string>], Name<ExtractLiteralDstName<MapT>>>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & ExpectedInput<
        {
            [src in Extract<keyof MapT, string>]? : (
                | ExpectedInputOf<
                    MapT[src]
                >
                | undefined
            )
        }
    >
    & MappableInput<
        {
            [src in Extract<keyof MapT, string>]? : (
                | MappableInputOf<
                    MapT[src]
                >
                | undefined
            )
        }
    >
);
export function partialDeriveMap<MapT extends FieldMap> (
    map : MapT
) : (
    PartialDeriveMapMapper<MapT>
) {
    const arr : SafeMapper<unknown>[] = [];
    for (let k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        const f = map[k];
        arr.push(derive(k, getNameOrEmptyString(f), optional(f)));
    }
    if (arr.length == 0) {
        return toEmptyObject() as any;
    }
    return unsafeDeepMerge(...arr) as any;
}