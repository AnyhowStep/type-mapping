export type IsAny<T> = (
    0 extends (1 & T) ?
    true :
    false
);

export type IsUnknown<T> = (
    unknown extends T ?
    (
        IsAny<T> extends true ?
        false :
        true
    ) :
    false
);

export type IsNever<T> = (
    [T] extends [never] ?
    (
        IsAny<T> extends true ?
        false :
        true
    ) :
    false
);

/*
type a1 = IsAny<any>;
type a2 = IsAny<unknown>;
type a3 = IsAny<never>;
type a4 = IsAny<string>;
type a5 = IsAny<{}>;
type a6 = IsAny<Object>;
type a7 = IsAny<object>;


type u1 = IsUnknown<any>;
type u2 = IsUnknown<unknown>;
type u3 = IsUnknown<never>;
type u4 = IsUnknown<string>;
type u5 = IsUnknown<{}>;
type u6 = IsUnknown<Object>;
type u7 = IsUnknown<object>;

type n1 = IsNever<any>;
type n2 = IsNever<unknown>;
type n3 = IsNever<never>;
type n4 = IsNever<string>;
type n5 = IsNever<{}>;
type n6 = IsNever<Object>;
type n7 = IsNever<object>;
*/