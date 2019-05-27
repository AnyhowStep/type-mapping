import * as tm from "../../../../../../dist";

declare function expectedInputOf<F extends tm.AnyMapper> (f : F) : tm.ExpectedInputOf<F>;

const acceptsNumberOrString = (_name : string, _mixed : number|string) => {
    return undefined;
};
const acceptsStringOrBoolean = (_name : string, _mixed : string|boolean) => {
    return undefined;
};
declare const unionType : typeof acceptsNumberOrString | typeof acceptsStringOrBoolean;

export const expectString = expectedInputOf(unionType);