//https://github.com/microsoft/TypeScript/issues/31810
export type _HACK_RestoreUndefinedType<T, OriginalT> = (
    {
        [index in keyof T] : (
            undefined extends OriginalT[Extract<index, keyof OriginalT>] ?
            undefined|T[index] :
            T[index]
        )
    }
);
export type RemoveOptionalModifier<T> = (
    _HACK_RestoreUndefinedType<
        {
            [index in keyof T]-? : T[index]
        },
        T
    >
);

/**
    ```ts
    Parameters<(_0 : number, _1? : string) => any>
    [number, (string|undefined)?]

    ToRequiredParameters<(_0 : number, _1? : string) => any>
    [number, string|undefined]
    ```
*/
export type ToRequiredParameters<FuncT extends (...args : any[]) => any> = (
    RemoveOptionalModifier<Parameters<FuncT>>
);