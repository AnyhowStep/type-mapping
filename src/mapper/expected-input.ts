/**
    Metadata attached to a `Mapper<>` that may be used
    by other libraries to restrict what input is passed
    to the `Mapper<>` during compile-time.

    Meant to be a subtype of `MappableInput<>`.

    -----

    ### Use Case

    You have a `Mapper<>` that maps `string|number` to `number`.

    So, the `MappableInput<>` is `string|number`.

    However, in your application code, you may wish to only ever
    pass `string` to the `Mapper<>`.

    So, you set the `ExpectedInput<>` to be `string`.

    @see MappableInput

*/
export interface ExpectedInput<T> {
    __expectedInput? : [T],
}