import {SafeMapper} from "../../mapper";

export function unknown () : SafeMapper<unknown> {
    return (_name : string, mixed : unknown) : unknown => {
        return mixed;
    };
}