import {AnyMapper, Mapper} from "../mapper";
import {MappableInput} from "../mappable-input";
import {ExpectedInput} from "../expected-input";
import {
    MappableInputOf,
    OutputOf,
    HandledInputOf,
} from "../query";

/**
    Lets you modify the `ExpectedInput<>` of a `Mapper<>`.

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
        & Mapper<HandledInputOf<F>, OutputOf<F>>
        & ExpectedInput<AcceptT>
        & MappableInput<MappableInputOf<F>>
    )
) {
    return () => {
        return f as any;
    };
};