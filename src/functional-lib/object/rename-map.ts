import {
    FieldMap,
    NonOptionalMappableInputKey,
    OptionalMappableInputKey,
    ExtractLiteralDstName,
    NonOptionalExpectedInputDstName,
    OptionalExpectedInputDstName,
    NonOptionalMappableInputDstName,
    OptionalMappableInputDstName,
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
} from "../../mapper";
import {unsafeDeepMerge} from "../operator";
import {rename} from "./rename";
import {toEmptyObject} from "./to-empty-object";

export type RenameMapMapper<MapT extends FieldMap> = (
    & SafeMapper<
        & {
            [dst in ExtractLiteralDstName<MapT>] : (
                MergedOutputOf<
                    Extract<
                        MapT[Extract<keyof MapT, string>],
                        { __name : dst }
                    >
                >
            )
        }
        & (
            string extends MapT[Extract<keyof MapT, string>]["__name"] ?
            {
                [name : string] : (
                    | OutputOf<
                        Exclude<MapT[Extract<keyof MapT, string>], { __name : ExtractLiteralDstName<MapT> }>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & ExpectedInput<
        & {
            [dst in NonOptionalExpectedInputDstName<MapT>] : (
                ExpectedInputOf<
                    Extract<
                        MapT[Extract<keyof MapT, string>],
                        { __name : dst }
                    >
                >
            )
        }
        & {
            [dst in OptionalExpectedInputDstName<MapT>]? : (
                ExpectedInputOf<
                    Extract<
                        MapT[Extract<keyof MapT, string>],
                        { __name : dst }
                    >
                >
            )
        }
        & (
            string extends MapT[Extract<keyof MapT, string>]["__name"] ?
            {
                [name : string] : (
                    | ExpectedInputOf<
                        Exclude<MapT[Extract<keyof MapT, string>], { __name : ExtractLiteralDstName<MapT> }>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & MappableInput<
        | (
            & {
                [src in NonOptionalMappableInputKey<MapT>] : (
                    MappableInputOf<
                        MapT[src]
                    >
                )
            }
            & {
                [src in OptionalMappableInputKey<MapT>]? : (
                    MappableInputOf<
                        MapT[src]
                    >
                )
            }
        )
        | (
            & {
                [dst in NonOptionalMappableInputDstName<MapT>] : (
                    MappableInputOf<
                        Extract<
                            MapT[Extract<keyof MapT, string>],
                            { __name : dst }
                        >
                    >
                )
            }
            & {
                [dst in OptionalMappableInputDstName<MapT>]? : (
                    MappableInputOf<
                        Extract<
                            MapT[Extract<keyof MapT, string>],
                            { __name : dst }
                        >
                    >
                )
            }
            & (
                string extends MapT[Extract<keyof MapT, string>]["__name"] ?
                {
                    [name : string] : (
                        | MappableInputOf<
                            Exclude<MapT[Extract<keyof MapT, string>], { __name : ExtractLiteralDstName<MapT> }>
                        >
                        | undefined
                    )
                } :
                unknown
            )
        )
    >
);
export function renameMap<MapT extends FieldMap> (
    map : MapT
) : (
    RenameMapMapper<MapT>
) {
    const arr : SafeMapper<unknown>[] = [];
    for (let k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        const f = map[k];
        arr.push(rename(k, getNameOrEmptyString(f), f));
    }
    if (arr.length == 0) {
        return toEmptyObject() as any;
    }
    return unsafeDeepMerge(...arr) as any;
}

/*
import { string } from "../string";
import { withName, withExpectedInput } from "../../mapper";
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