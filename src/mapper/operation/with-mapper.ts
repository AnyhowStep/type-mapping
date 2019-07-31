import {AnyMapper} from "../mapper";
import {NameOf, getNameOrEmptyString} from "../query";
import {WithName, withName} from "./with-name";

export type WithMapper<
    F extends AnyMapper,
    NewMapperT extends AnyMapper
> = (
    WithName<NewMapperT, NameOf<F>>
);
export function withMapper<
    F extends AnyMapper,
    NewMapperT extends AnyMapper
> (
    f : F,
    newMapper : NewMapperT
) : (
    WithMapper<F, NewMapperT>
) {
    return withName(newMapper, getNameOrEmptyString(f));
}