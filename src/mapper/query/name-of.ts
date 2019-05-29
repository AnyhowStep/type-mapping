import {AnyExtendedMapper} from "../extended-mapper";

export type NameOf<F extends AnyExtendedMapper> = (
    "name" extends keyof F ?
    (
        F[Extract<"name", keyof F>] extends string ?
        F[Extract<"name", keyof F>] :
        string
    ) :
    string
);

export function getNameOrEmptyString<F extends AnyExtendedMapper> (f : F) : NameOf<F> {
    if (typeof f != "function") {
        return "" as any;
    }
    const result = f.name;
    return (
        (typeof result == "string") ?
        result :
        ""
    ) as any;
}