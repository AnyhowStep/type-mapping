import {
    AnySafeMapper,
    SafeMapper,
    Name,
    OutputOf,
    ExpectedInputOfImpl,
    MappableInputOfImpl,
    getNameOrEmptyString,
    ExpectedInput,
    MappableInput,
} from "../../mapper";
import {unsafeOr} from "../operator";
import {toEmptyObject} from "./to-empty-object";
import {partialObjectFromMap} from "./partial-object-from-map";

type ExtractLiteralName<F extends AnySafeMapper & Name<string>> = (
    F extends any ?
    (
        string extends F["__name"] ?
        never :
        F["__name"]
    ) :
    never
);

export type PartialObjectFromArrayMapper<ArrT extends (AnySafeMapper & Name<string>)[]> = (
    & SafeMapper<
        & {
            [name in ExtractLiteralName<ArrT[number]>] : (
                | OutputOf<
                    Extract<ArrT[number], Name<name>>
                >
                | undefined
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
            [name in ExtractLiteralName<ArrT[number]>]? : (
                | ExpectedInputOfImpl<
                    Extract<ArrT[number], Name<name>>
                >[0]
                | undefined
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
            [name in ExtractLiteralName<ArrT[number]>]? : (
                | MappableInputOfImpl<
                    Extract<ArrT[number], Name<name>>
                >[0]
                | undefined
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
export function partialObjectFromArray<ArrT extends (AnySafeMapper & Name<string>)[]> (...arr : ArrT) : (
    PartialObjectFromArrayMapper<ArrT>
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
    return partialObjectFromMap(map) as any;
}