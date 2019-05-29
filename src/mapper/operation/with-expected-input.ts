import {AnyMapper, Mapper} from "../mapper";
import {MappableInput} from "../mappable-input";
import {ExpectedInput} from "../expected-input";
import {ExtractOptionalOrUnknown} from "./extract-optional-or-unknown";
import {ExtractNameOrUnknown} from "./extract-name-or-unknown";
import {
    MappableInputOf,
    OutputOf,
    HandledInputOf,
} from "../query";

export type WithExpectedInput<F extends AnyMapper, AcceptT extends MappableInputOf<F>> = (
    & Mapper<HandledInputOf<F>, OutputOf<F>>
    & ExpectedInput<AcceptT>
    & MappableInput<MappableInputOf<F>>
    & ExtractOptionalOrUnknown<F>
    & ExtractNameOrUnknown<F>
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
export function withExpectedInput<F extends AnyMapper>(
    f : F
) : (
    <AcceptT extends MappableInputOf<F>>() => (
        WithExpectedInput<F, AcceptT>
    )
) {
    return () => {
        return f as any;
    };
};