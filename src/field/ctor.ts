import {AnySafeMapper, OutputOf} from "../mapper";
import {IField} from "./field";

/**
    Implements `IField<>` with extra convenience methods
*/
export interface Field<
    NameT extends string,
    OutputT
> extends IField<NameT, OutputT> {
    withName<NewNameT extends string> (name : NewNameT) : Field<NewNameT, OutputT>;
}

/**
    Constructs a `Field<>` type
*/
export function field<
    NameT extends string,
    F extends AnySafeMapper
> (
    name : NameT,
    f : F
) : (
    Field<NameT, OutputOf<F>>
) {
    const result = (name : string, mixed : unknown) => {
        return f(name, mixed);
    };
    result.name = name;
    //Hack to set the `name` of a function
    Object.defineProperty(
        result,
        "name",
        {
            value : name,
        }
    );

    result.withName = <NewNameT extends string>(name : NewNameT) => {
        return field(name, f);
    };

    return result;
}
