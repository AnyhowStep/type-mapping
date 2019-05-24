import * as tm from "../../../../dist";

declare function acceptsOf<F extends tm.AnyTypeMapDelegate> (f : F) : tm.AcceptsOf<F>;

const acceptsNumberOrFunction = (_name : string, _mixed : number|Function) => {
    return undefined;
};
const acceptsBooleanOrDate = (_name : string, _mixed : boolean|Date) => {
    return undefined;
};
declare const unionType : typeof acceptsNumberOrFunction | typeof acceptsBooleanOrDate;

export const expectUnion = acceptsOf(unionType);