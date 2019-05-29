import {AnyExtendedMapper} from "../extended-mapper";
import {Optional} from "../optional";

export type OptionalFlagOf<F extends AnyExtendedMapper> = (
    F extends Optional ?
        true :
        false
);

export function getOptionalFlagOrFalse<F extends AnyExtendedMapper> (f : F) : OptionalFlagOf<F> {
    const result = (f as any).__optional;
    return (result === true) as any;
}
