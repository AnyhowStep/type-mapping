/**
    Used to mark a `Mapper<>` as optional
    when used in a `RawFieldMap`.

    Only has an effect if the `MappableInputOf<>`
    the `Mapper<>` contains `undefined`

    If `IsOptional<>`,

    + The `ExpectedInput<>` of the field will be marked optional
      if the `ExpectedInput<>` of the `Mapper<>` contains `undefined`

    + The `MappableInput<>` of the field will be marked optional

*/
export interface Optional {
  readonly __optional : true,
}