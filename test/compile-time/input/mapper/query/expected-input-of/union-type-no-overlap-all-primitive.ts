import * as tm from "../../../../../../dist";

declare function expectedInputOf<F extends tm.AnyMapper> (f : F) : tm.ExpectedInputOf<F>;

const acceptsNumberOrString = (_name : string, _mixed : number|string) => {
    return undefined;
};
const acceptsBooleanOrBigint = (_name : string, _mixed : boolean|bigint) => {
    return undefined;
};
declare const unionType : typeof acceptsNumberOrString | typeof acceptsBooleanOrBigint;

export const expectNever = expectedInputOf(unionType);