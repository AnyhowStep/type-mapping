import {AnyTypeMapDelegate} from "./type-map-delegate";

/**
    Gives you the return type of a `TypeMapDelegate<>`
*/
export type ResultOf<F extends AnyTypeMapDelegate> = (
    ReturnType<F>
);