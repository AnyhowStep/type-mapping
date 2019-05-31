import {AnyMapper, Mapper} from "../mapper";
import {ExtractOptionalOrUnknown} from "./extract-optional-or-unknown";
import {
    OutputOf,
    HandledInputOf,
} from "../query";
import { ExtractExpectedInputOrUnknown } from "./extract-expected-input-or-unknown";
import { ExtractMappableInputOrUnknown } from "./extract-mappable-input-or-unknown";
import { Name } from "../name";
import { setFunctionName } from "../../type-util";
import { copyOptional } from "./copy-run-time-modifier";

export type WithName<F extends AnyMapper, NameT extends string> = (
    & Mapper<HandledInputOf<F>, OutputOf<F>>
    & ExtractExpectedInputOrUnknown<F>
    & ExtractMappableInputOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
    & (
        string extends NameT ?
        unknown :
        Name<NameT>
    )
);
/**
    Lets you modify the `ExpectedInput<>` of a `Mapper<>`.

    Returns the same `Mapper<>`, DOES NOT create a new function.

    TODO Decide if it should return a wrapper.

    -----

    ### Use Case

    Give a `Mapper<>` with the following properties,

    + `MappableInput<> = string|number`
    + `ExpectedInput<> = string`

    If we wish to change the `ExpectedInput<>` to `number`,
    we do the following,

    ```ts
    const otherMapper = withExpectedInput(mapper)<number>();
    ```
*/
export function withName<F extends AnyMapper, NameT extends string>(
    f : F,
    name : NameT
) : (
    WithName<F, NameT>
) {
    const result = (name : string, mixed : unknown) => {
        return f(name, mixed);
    };
    result.name = name;
    setFunctionName(result, result.name);
    return copyOptional(f, result) as any;
};