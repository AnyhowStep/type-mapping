import {Name} from "../mapper";

/**
    Modifies `f` directly.
*/
export function setFunctionName<F extends (...args : any[]) => any> (
    f : Function,
    name : string|undefined
) : F & Name<string> {
    if (typeof name != "string") {
        name = "";
    }
    (f as any).__name = name;
    return f as any;
}