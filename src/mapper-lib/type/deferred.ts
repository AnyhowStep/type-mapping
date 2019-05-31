import {SafeMapper} from "../../mapper";

export interface DeferredMapper<OutputT> extends SafeMapper<OutputT> {
    setImplementation (f : SafeMapper<OutputT>) : void;
};
export function deferred<OutputT> () : DeferredMapper<OutputT> {
    let implementation : SafeMapper<OutputT>|undefined = undefined;
    const result = (name : string, mixed : unknown) : OutputT => {
        if (implementation == undefined) {
            throw new Error(`Cannot check ${name}; no implementation given for deferred mapper`);
        } else {
            return implementation(name, mixed);
        }
    };
    result.setImplementation =(f : SafeMapper<OutputT>) => {
        implementation = f;
    };
    return result;
}