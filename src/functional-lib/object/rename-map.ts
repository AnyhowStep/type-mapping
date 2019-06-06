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
    Name,
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
                        Name<dst>
                    >
                >
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
        & (
            NonOptionalExpectedInputDstName<MapT> extends never ?
            unknown :
            {
                [dst in NonOptionalExpectedInputDstName<MapT>] : (
                    ExpectedInputOf<
                        Extract<
                            MapT[Extract<keyof MapT, string>],
                            Name<dst>
                        >
                    >
                )
            }
        )
        & (
            OptionalExpectedInputDstName<MapT> extends never ?
            unknown :
            {
                [dst in OptionalExpectedInputDstName<MapT>]? : (
                    ExpectedInputOf<
                        Extract<
                            MapT[Extract<keyof MapT, string>],
                            Name<dst>
                        >
                    >
                )
            }
        )
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
        | (
            & (
                NonOptionalMappableInputKey<MapT> extends never ?
                unknown :
                {
                    [src in NonOptionalMappableInputKey<MapT>] : (
                        MappableInputOf<
                            MapT[src]
                        >
                    )
                }
            )
            & (
                OptionalMappableInputKey<MapT> extends never ?
                unknown :
                {
                    [src in OptionalMappableInputKey<MapT>]? : (
                        MappableInputOf<
                            MapT[src]
                        >
                    )
                }
            )
        )
        | (
            & (
                NonOptionalMappableInputDstName<MapT> extends never ?
                unknown :
                {
                    [dst in NonOptionalMappableInputDstName<MapT>] : (
                        MappableInputOf<
                            Extract<
                                MapT[Extract<keyof MapT, string>],
                                Name<dst>
                            >
                        >
                    )
                }
            )
            & (
                OptionalMappableInputDstName<MapT> extends never ?
                unknown :
                {
                    [dst in OptionalMappableInputDstName<MapT>]? : (
                        MappableInputOf<
                            Extract<
                                MapT[Extract<keyof MapT, string>],
                                Name<dst>
                            >
                        >
                    )
                }
            )
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