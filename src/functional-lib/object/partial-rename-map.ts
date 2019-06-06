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
import {rename} from "./rename";
import {toEmptyObject} from "./to-empty-object";

export type PartialRenameMapMapper<MapT extends FieldMap> = (
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
        & {
            [dst in ExtractLiteralDstName<MapT>]? : (
                | ExpectedInputOf<
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
                    | ExpectedInputOf<
                        Exclude<MapT[Extract<keyof MapT, string>], Name<ExtractLiteralDstName<MapT>>>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & MappableInput<
        | {
            [src in Extract<keyof MapT, string>]? : (
                | MappableInputOf<
                    MapT[src]
                >
                | undefined
            )
        }
        | (
            & {
                [dst in ExtractLiteralDstName<MapT>]? : (
                    | MappableInputOf<
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
                        | MappableInputOf<
                            Exclude<MapT[Extract<keyof MapT, string>], Name<ExtractLiteralDstName<MapT>>>
                        >
                        | undefined
                    )
                } :
                unknown
            )
        )
    >
);
export function partialRenameMap<MapT extends FieldMap> (
    map : MapT
) : (
    PartialRenameMapMapper<MapT>
) {
    const arr : SafeMapper<unknown>[] = [];
    for (let k in map) {
        if (!map.hasOwnProperty(k)) {
            continue;
        }
        const f = map[k];
        arr.push(rename(k, getNameOrEmptyString(f), optional(f)));
    }
    if (arr.length == 0) {
        return toEmptyObject() as any;
    }
    return unsafeDeepMerge(...arr) as any;
}