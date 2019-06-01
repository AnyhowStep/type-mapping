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
    Object.defineProperty(f, "name", { value : name });
    return f as any;
}