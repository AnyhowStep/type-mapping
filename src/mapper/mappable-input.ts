/**
    Metadata attached to a `Mapper<>` that may be used
    by other libraries to restrict what input is passed
    to the `Mapper<>` during compile-time.

    Meant to be a subtype of `HandledInputOf<>`.

    -----

    ### Use Case

    A `Mapper<>` may properly handle `unknown`.

    However, it will only succeed in mapping
    `string|number` to `number`.

    If any other type is passed to it,
    it'll throw an `Error`.

    We set the `MappableInput<>` to `string|number`
    so other libraries may know what inputs
    can map successfully to `number`.

    @see Mapper
    @see HandledInputOf
*/
export interface MappableInput<T> {
    __mappableInput? : [T],
}