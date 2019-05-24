import * as tm from "../../../../dist";

declare function acceptsOf<F extends tm.AnyTypeMapDelegate> (f : F) : tm.AcceptsOf<F>;

const acceptsDateOrFunction = (_name : string, _mixed : Date|Function) => {
    return undefined;
};
const acceptsBufferOrHTMLElement = (_name : string, _mixed : Buffer|HTMLElement) => {
    return undefined;
};
declare const unionType : typeof acceptsDateOrFunction | typeof acceptsBufferOrHTMLElement;

export const expectUnion = acceptsOf(unionType);