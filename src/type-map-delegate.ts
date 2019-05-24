/**
    A `TypeMapDelegate<>` must satisfy the following,

    ```ts
    deepEquals(f(x), f(f(x)))
    ```

    That is, if `f(0)` is `"hello"`, then `f("hello")` must be `f("hello")`.
*/
export interface TypeMapDelegate<AcceptsT, ResultT> {
    (name : string, mixed : AcceptsT) : ResultT,
}
export type AnyTypeMapDelegate = (
    TypeMapDelegate<any, any>
);
