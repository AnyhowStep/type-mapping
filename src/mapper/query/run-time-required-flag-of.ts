import {AnyExtendedMapper} from "../extended-mapper";
import {RunTimeRequired} from "../run-time-required";

export type RunTimeRequiredFlagOf<F extends AnyExtendedMapper> = (
    F extends RunTimeRequired ?
        true :
        false
);

export function getRunTimeRequiredFlagOrFalse<F extends AnyExtendedMapper> (f : F) : RunTimeRequiredFlagOf<F> {
    const result = (f as any).__runTimeRequired;
    return (result === true) as any;
}
