export type ExtractKeyOfType<ObjT, TypeT> = (
    {
        [k in Extract<keyof ObjT, string|symbol>] : (
            [TypeT] extends [ObjT[k]] ?
            (
                [ObjT[k]] extends [TypeT] ?
                k :
                never
            ) :
            never
        )
    }[Extract<keyof ObjT, string|symbol>]
);