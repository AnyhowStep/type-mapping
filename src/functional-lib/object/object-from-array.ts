import { AnySafeMapper, SafeMapper } from "../../mapper";
import { Name } from "../../mapper";
import { OutputOf, ExpectedInputOfImpl, MappableInputOfImpl, getNameOrEmptyString} from "../../mapper";
import { ExpectedInput } from "../../mapper";
import { IsExpectedInputOptional, IsOptional } from "../../mapper";
import { MappableInput } from "../../mapper";
import { unsafeOr } from "../operator";
import { objectFromMap } from "./object-from-map";
import { toEmptyObject } from "./to-empty-object";

type ExtractLiteralName<F extends AnySafeMapper & Name<string>> = (
    F extends any ?
    (
        string extends F["__name"] ?
        never :
        F["__name"]
    ) :
    never
);

export type ObjectFromArrayMapper<ArrT extends (AnySafeMapper & Name<string>)[]> = (
    & SafeMapper<
        & {
            [name in ExtractLiteralName<ArrT[number]>] : (
                OutputOf<
                    Extract<ArrT[number], Name<name>>
                >
            )
        }
        & (
            string extends ArrT[number]["__name"] ?
            {
                [name : string] : (
                    | OutputOf<
                        Exclude<ArrT[number], Name<ExtractLiteralName<ArrT[number]>>>
                    >
                    | undefined
                )
            } :
            unknown
        )
    >
    & ExpectedInput<
        & {
            [name in {
                [k in ExtractLiteralName<ArrT[number]>] : (
                    IsExpectedInputOptional<Extract<ArrT[number], Name<k>>> extends true ?
                    never :
                    k
                )
            }[ExtractLiteralName<ArrT[number]>]] : (
                ExpectedInputOfImpl<
                    Extract<ArrT[number], Name<name>>
                >[0]
            )
        }
        & {
            [name in {
                [k in ExtractLiteralName<ArrT[number]>] : (
                    IsExpectedInputOptional<Extract<ArrT[number], Name<k>>> extends true ?
                    k :
                    never
                )
            }[ExtractLiteralName<ArrT[number]>]]? : (
                ExpectedInputOfImpl<
                    Extract<ArrT[number], Name<name>>
                >[0]
            )
        }
        & (
            string extends ArrT[number]["__name"] ?
            {
                [name : string] : (
                    | ExpectedInputOfImpl<
                        Exclude<ArrT[number], Name<ExtractLiteralName<ArrT[number]>>>
                    >[0]
                    | undefined
                )
            } :
            unknown
        )
    >
    & MappableInput<
        & {
            [name in {
                [k in ExtractLiteralName<ArrT[number]>] : (
                    IsOptional<Extract<ArrT[number], Name<k>>> extends true ?
                    never :
                    k
                )
            }[ExtractLiteralName<ArrT[number]>]] : (
                MappableInputOfImpl<
                    Extract<ArrT[number], Name<name>>
                >[0]
            )
        }
        & {
            [name in {
                [k in ExtractLiteralName<ArrT[number]>] : (
                    IsOptional<Extract<ArrT[number], Name<k>>> extends true ?
                    k :
                    never
                )
            }[ExtractLiteralName<ArrT[number]>]]? : (
                MappableInputOfImpl<
                    Extract<ArrT[number], Name<name>>
                >[0]
            )
        }
        & (
            string extends ArrT[number]["__name"] ?
            {
                [name : string] : (
                    | MappableInputOfImpl<
                        Exclude<ArrT[number], Name<ExtractLiteralName<ArrT[number]>>>
                    >[0]
                    | undefined
                )
            } :
            unknown
        )
    >
);
/**
    This,
    ```ts
    objectFromArray(
        withName(unsignedInteger(), "foo"),
        withName(string(), "foo")
    );
    ```

    Is the same as,
    ```ts
    objectFromArray(
        withName(or(
            unsignedInteger(),
            string()
        ), "foo")
    );
    ```
*/
export function objectFromArray<ArrT extends (AnySafeMapper & Name<string>)[]> (...arr : ArrT) : (
    ObjectFromArrayMapper<ArrT>
) {
    if (arr.length == 0) {
        return toEmptyObject() as any;
    }
    const groupedByName : { [k : string] : AnySafeMapper[]|undefined } = {};
    for (const f of arr) {
        const name = getNameOrEmptyString(f);
        let mappers = groupedByName[name];
        if (mappers == undefined) {
            mappers = [];
            groupedByName[name] = mappers;
        }
        mappers.push(f);
    }
    const map : { [k : string] : AnySafeMapper } = {};
    for (const k in groupedByName) {
        const mappers = groupedByName[k];
        if (mappers == undefined) {
            continue;
        }
        map[k] = (mappers.length == 1) ?
            mappers[0] :
            unsafeOr(...mappers);
    }
    return objectFromMap(map) as any;
}
/*
import { unsignedInteger } from "../number";
import { fluentMapper } from "../../fluent";
import { string } from "../string";
import { boolean, stringToBoolean } from "../boolean";
const x = objectFromArray(
    fluentMapper(string()),
    fluentMapper(boolean()),
    fluentMapper(unsignedInteger())
        .withName("test"),
    fluentMapper(boolean())
        .withName("test"),
    fluentMapper(boolean())
        .orUndefined()
        .withName("shouldNotBeOptional"),
    fluentMapper(stringToBoolean())
        .optional()
        .withExpectedInput<string|undefined>()
        .withName("shouldBeOptional"),
)
x.__expectedInput
x.__mappableInput

const out = x("", "")
out.test = 1;
const blah = out["blah"];
//*/