import * as tm from "../../../../dist";

declare function acceptsOf<F extends tm.AnyTypeMapDelegate> (f : F) : tm.AcceptsOf<F>;

const acceptsNumberOrString = (_name : string, _mixed : number|string) => {
    return undefined;
};
const acceptsBooleanOrBigint = (_name : string, _mixed : boolean|bigint) => {
    return undefined;
};
declare const unionType : typeof acceptsNumberOrString | typeof acceptsBooleanOrBigint;

export const expectNever = acceptsOf(unionType);