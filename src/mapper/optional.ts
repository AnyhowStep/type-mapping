/**
    Used to mark a `Mapper<>` as optional during compile-time
    when used in a `RawFieldMap`.

    Only has an effect if the `MappableInputOf<>`
    the `Mapper<>` contains `undefined`

    If `IsOptional<>`,

    + The `ExpectedInput<>` of the field will be marked optional
      if the `ExpectedInput<>` of the `Mapper<>` contains `undefined`

    + The `MappableInput<>` of the field will be marked optional

    -----

    During run-time, all `Mapper<>`s that allow `undefined`
    are run-time optional.

    To make a `Mapper<>` run-time required and allow `undefined`,
    ```ts
    const m = runTimeRequired(orUndefined(myMapper))
    ```
*/
export interface Optional {
    readonly __optional : true,
}