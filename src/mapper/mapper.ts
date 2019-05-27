/**
    A `Mapper<HandledInputT, OutputT>` takes a `HandledInputT` and does one of the following,

    + Produces an `OutputT`
    + Throws an `Error`

    -----

    A `Mapper<>` must also satisfy the following properties,

    + It must handle inputs correctly
    + It must be idempotent
    + All inputs must be treated as immutable

    -----

    ### Input Handling

    When a `Mapper<>` is given an input of type `HandledInputT`,
    it **must** handle it correctly.

    It **must not** silently produce an invalid output.

    It **must not** throw an `Error` on valid input.

    If you pass an input that is not of type `HandledInputT`,
    the behaviour is undefined.

    -----

    ### Idempotence

    A `Mapper<>` must satisfy the following,

    ```ts
    deepEquals(f(x), f(f(x)))
    ```

    That is, if `f(0)` is `"hello"`, then `f("hello")` must be `"hello"`.

    -----

    ### Immutability

    A `Mapper<>` must **NEVER** modify its input argument.

    That is, all inputs must be treated as immutable.

    A `Mapper<>` may,

    + Return the same input
    + Return a copy of the input
    + Return a completely different object

    -----

    ### Performance Concerns

    While performance is not a main concern of this library,
    a `Mapper<>` should try to not needlessly create expensive objects.
*/
export interface Mapper<HandledInputT, OutputT> {
    (name : string, mixed : HandledInputT) : OutputT,
}
export type AnyMapper = (
    Mapper<any, any>
);
