import {SafeMapper} from "../../mapper";
import {instanceOfObject} from "../object";
import {pipe} from "../operator";
import {length} from "./length";

export function implementsArrayLike () : SafeMapper<ArrayLike<any>> {
    return pipe(
        instanceOfObject(),
        length({})
    );
}