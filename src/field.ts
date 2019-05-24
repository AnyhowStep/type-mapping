import {SafeTypeMapDelegate} from "./safe-type-map-delegate";
import {ResultOf} from "./result-of";

export interface IField<
    NameT extends string,
    F extends SafeTypeMapDelegate<any>
> extends SafeTypeMapDelegate<ResultOf<F>> {
    name : NameT,
}
export type AnyField = (
    IField<any, any>
);
