import {Mapper} from "./mapper";

/**
    A `SafeMapper<>` is a `Mapper<>` that handles **all**
    types of input correctly.

    Its `HandledInputT` is `unknown`.

    -----

    You should generally just use `SafeMapper<>`
    because there is no risk of undefined behaviour.

    @see Mapper
*/
export type SafeMapper<OutputT> = (
    Mapper<unknown, OutputT>
);

export type AnySafeMapper = (
    SafeMapper<any>
);