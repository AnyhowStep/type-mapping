/**
    Used to mark a `Mapper<>` as required during run-time
    when used in a `RawFieldMap`.

    Only really useful if the `Mapper<>` itself
    allows `undefined`.
*/
export interface RunTimeRequired {
    readonly __runTimeRequired : true,
}