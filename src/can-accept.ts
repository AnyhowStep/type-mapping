/**
    Helper type that says a `SafeTypeMapDelegate<>`
    CAN accept certain data types,
    and not throw an Error in general.

    Just because the `SafeTypeMapDelegate<>`
    CAN accept the data type, doesn't mean
    it actually WANTS to accept it.
*/
export interface CanAccept<T> {
    canAccept? : [T],
}