import * as tm from "../../../../../../dist";

declare function expectedInputOf<F extends tm.AnyMapper> (f : F) : tm.ExpectedInputOf<F>;

const acceptsNumberOrFunction = (_name : string, _mixed : number|Function) => {
    return undefined;
};
const acceptsBooleanOrDate = (_name : string, _mixed : boolean|Date) => {
    return undefined;
};
declare const unionType : typeof acceptsNumberOrFunction | typeof acceptsBooleanOrDate;

export const expectUnion = expectedInputOf(unionType);