import {SafeMapper} from "../../mapper/safe-mapper";

/**
    Always returns a new empty object.
*/
export function emptyObject () : SafeMapper<{}> {
    return () => {
        return {};
    };
}