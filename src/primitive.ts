/**
    Union of primitive types in TypeScript
*/
export type Primitive = (
    | null
    | undefined
    | string
    | number
    | bigint
    | boolean
    | symbol
);
/**
    Union of primitive types that can have literal types
*/
export type LiteralType = (
    | null
    | undefined
    | string
    | number
    | bigint
    | boolean
);