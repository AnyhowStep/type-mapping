import {AnyMapper, Mapper} from "../mapper";
import {ExtractOptionalOrUnknown} from "./extract-optional-or-unknown";
import {
    OutputOf,
    HandledInputOf,
} from "../query";
import {ExtractExpectedInputOrUnknown} from "./extract-expected-input-or-unknown";
import {ExtractMappableInputOrUnknown} from "./extract-mappable-input-or-unknown";
import {ExtractRunTimeRequiredOrUnknown} from "./extract-run-time-required-or-unknown";
import {Name} from "../name";
import {setFunctionName} from "../../type-util";
import {copyOptional, copyRunTimeRequired} from "./copy-run-time-modifier";

export type WithName<F extends AnyMapper, NameT extends string> = (
    & Mapper<HandledInputOf<F>, OutputOf<F>>
    & ExtractExpectedInputOrUnknown<F>
    & ExtractMappableInputOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
    & ExtractRunTimeRequiredOrUnknown<F>
    & (
        string extends NameT ?
        unknown :
        Name<NameT>
    )
);
/**
    Lets you modify the `Name<>` of a `Mapper<>`.

    Returns a new `Mapper<>`.
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
    return copyRunTimeRequired(
        f,
        copyOptional(
            f,
            setFunctionName(result, name)
        )
    );
};