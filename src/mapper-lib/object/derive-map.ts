import {SafeMapperMap, FieldMap} from "../../field-map";
import {
    SafeMapper,
    ExpectedInput,
    NameOf,
    OutputOf,
    ExpectedInputOf,
    MappableInputOf,
    MappableInput,
    IsExpectedInputOptional,
} from "../../mapper";
import { IsOptional } from "../../mapper/predicate";
import { AnySafeMapper } from "../../mapper/safe-mapper";
import { UnionToIntersection } from "../../type-util";
import { deepMerge } from "../operator";
import { derive } from "./derive";

type ExtractLiteralDstName<MapT extends SafeMapperMap> = (
    {
        [srcName in Extract<keyof MapT, string>] : (
            string extends NameOf<MapT[srcName]> ?
            never :
            NameOf<MapT[srcName]>
        )
    }[Extract<keyof MapT, string>]
);
//TODO Move this to mapper directory
type DeepMergeOutputOfImpl<F extends AnySafeMapper> = (
    F extends AnySafeMapper ?
    [OutputOf<F>] :
    never
);
type DeepMergeOutputOf<F extends AnySafeMapper> = (
    Extract<
        UnionToIntersection<DeepMergeOutputOfImpl<F>>,
        [any]
    >[0]
);

export type DeriveMapMapper<MapT extends FieldMap> = (
    & SafeMapper<
        & {
            [dst in ExtractLiteralDstName<MapT>] : (
                DeepMergeOutputOf<
                    Extract<
                        MapT[Extract<keyof MapT, string>],
                        { name : dst }
                    >
                >
            )
        }
        & (
            string extends MapT[Extract<keyof MapT, string>]["name"] ?
            {
                [name : string] : (
                    | OutputOf<
                        Exclude<MapT[Extract<keyof MapT, string>], { name : ExtractLiteralDstName<MapT> }>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & ExpectedInput<
        & {
            [src in {
                [k in Extract<keyof MapT, string>] : (
                    IsExpectedInputOptional<MapT[k]> extends true ?
                    never :
                    k
                )
            }[Extract<keyof MapT, string>]] : (
                ExpectedInputOf<
                    MapT[src]
                >
            )
        }
        & {
            [src in {
                [k in Extract<keyof MapT, string>] : (
                    IsExpectedInputOptional<MapT[k]> extends true ?
                    k :
                    never
                )
            }[Extract<keyof MapT, string>]]? : (
                ExpectedInputOf<
                    MapT[src]
                >
            )
        }
    >
    & MappableInput<
        & {
            [src in {
                [k in Extract<keyof MapT, string>] : (
                    IsOptional<MapT[k]> extends true ?
                    never :
                    k
                )
            }[Extract<keyof MapT, string>]] : (
                MappableInputOf<
                    MapT[src]
                >
            )
        }
        & {
            [src in {
                [k in Extract<keyof MapT, string>] : (
                    IsOptional<MapT[k]> extends true ?
                    k :
                    never
                )
            }[Extract<keyof MapT, string>]]? : (
                MappableInputOf<
                    MapT[src]
                >
            )
        }
    >
);
export function deriveMap<MapT extends FieldMap> (
    map : MapT
) : (
    DeriveMapMapper<MapT>
) {
    const arr : SafeMapper<unknown>[] = [];
    for (let k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        const f = map[k];
        arr.push(derive(k, f.name, f));
    }
    return deepMerge(...arr) as any;
}

/*
import { string } from "../string";
import { withName, withExpectedInput } from "../../mapper/operation";
import { unsignedInteger, stringToFiniteNumber } from "../number";
import { optional } from "../operator";

const m = renameMap({
    x : withName(string(), "y"),
    x2 : withName(unsignedInteger(), "y"),
    a : withExpectedInput(withName(stringToFiniteNumber(), "b"))<string>(),
    a2 : withExpectedInput(withName(stringToFiniteNumber(), "b2"))<string|number>(),
    a3 : withExpectedInput(withName(stringToFiniteNumber(), "b2"))<number>(),
    o : withExpectedInput(withName(optional(stringToFiniteNumber()), "_o"))<number>(),
});
m.__expectedInput
m.__mappableInput

const x = optional(withExpectedInput(withName(stringToFiniteNumber(), "_o"))<number>());

const m2 = renameMap({
    x : withName(string(), "y" as string),
    x2 : withName(unsignedInteger(), "y" as string),
    a : withExpectedInput(withName(stringToFiniteNumber(), "b"))<string>(),
    a2 : withExpectedInput(withName(stringToFiniteNumber(), "b2"))<string|number>(),
    a3 : withExpectedInput(withName(stringToFiniteNumber(), "b2"))<number>(),
    o : withExpectedInput(withName(optional(stringToFiniteNumber()), "_o"))<number>(),
    c2 : withExpectedInput(withName(stringToFiniteNumber(), "c2"))<string|number>(),
    c3 : withExpectedInput(withName(string(), "c2"))<string>(),
});
//*/