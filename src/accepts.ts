/**
    Meant to be a subtype of `CanAccept<>`.

    Says that the `SafeTypeMapDelegate<>`
    WANTS to accept certain data types.
*/
export interface Accepts<T> {
    accepts? : [T],
}