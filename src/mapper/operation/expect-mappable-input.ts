import {AnyMapper, Mapper} from "../mapper";
import {MappableInput} from "../mappable-input";
import {ExpectedInput} from "../expected-input";
import {ExtractRunTimeModifierOrUnknown} from "./extract-run-time-modifier-or-unknown";
import {
    MappableInputOf,
    OutputOf,
    HandledInputOf,
} from "../query";

export type ExpectMappableInput<F extends AnyMapper> = (
    & Mapper<HandledInputOf<F>, OutputOf<F>>
    & ExpectedInput<MappableInputOf<F>>
    & MappableInput<MappableInputOf<F>>
    & ExtractRunTimeModifierOrUnknown<F>
);
/**
    Makes the `ExpectedInput<>` of a `Mapper<>` the same as its
    `MappableInput<>`.

    Returns the same `Mapper<>`, DOES NOT create a new function.

    TODO Decide if it should return a wrapper.
*/
export function expectMappableInput<F extends AnyMapper>(
    f : F
) : (
    ExpectMappableInput<F>
) {
    return f as any;
};