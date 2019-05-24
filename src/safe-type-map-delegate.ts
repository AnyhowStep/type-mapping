import {TypeMapDelegate} from "./type-map-delegate";

/**
    You should generally just use `SafeTypeMapDelegate<>`
    because it is more likely to throw an Error instead
    of silently mapping invalid values.
*/
export type SafeTypeMapDelegate<ResultT> = (
    TypeMapDelegate<unknown, ResultT>
);

