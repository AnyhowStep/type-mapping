export type ExtractKeyOfType<ObjT, TypeT> = (
    {
        [k in Extract<keyof ObjT, string|symbol>] : (
            [TypeT] extends [ObjT[k]] ?
            k :
            never
        )
    }[Extract<keyof ObjT, string|symbol>]
);