import {SafeMapper} from "../../mapper";

/**
    Always returns a new empty object.
    Basically, converts *everything* into an empty object.
*/
export function toEmptyObject () : SafeMapper<{}> {
    return () => {
        return {};
    };
}