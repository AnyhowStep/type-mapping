import {AnyExtendedMapper} from "../extended-mapper";
import {ExtractNameOrUnknown} from "./extract-name-or-unknown";
import {ExtractOptionalOrUnknown} from "./extract-optional-or-unknown";
import {ExtractRunTimeRequiredOrUnknown} from "./extract-run-time-required-or-unknown";

export type ExtractRunTimeModifierOrUnknown<F extends AnyExtendedMapper> = (
    & ExtractNameOrUnknown<F>
    & ExtractOptionalOrUnknown<F>
    & ExtractRunTimeRequiredOrUnknown<F>
);