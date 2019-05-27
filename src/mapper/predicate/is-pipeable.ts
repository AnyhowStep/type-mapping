import {AnyMapper, Mapper} from "../mapper";
import {OutputOf, MappableInputOf} from "../query";

/**
    Tells you if it is "safe" to pipe one `Mapper<>` into another.

    The definition of "safe" being that the input will be
    handled correctly.

    -----

    ```
    From - Output   | To - Input        | extends           | Okay?
    ----------------|-------------------|-------------------|------
    {}              | { x : number}    | To extends From   | No
    { x : number}  | {}                | From extends To   | Yes
    number|undefined| number            | To extends From   | No
    number          | number|undefined  | From extends To   | Yes
    number          | 0                 | To extends From   | No
    number          | boolean           |                   | No
    ```
*/
export type IsPipeable<
    FromF extends AnyMapper,
    ToF extends AnyMapper
> = (
    ToF extends Mapper<infer HandledInputT, any> ?
    (
        unknown extends HandledInputT ?
        true :
        OutputOf<FromF> extends MappableInputOf<ToF> ?
        true :
        false
    ) :
    false
);

/**
    Used in parameter lists to assert that one `Mapper<>`
    can be safely piped into another.

    @see IsPipeable
*/
export type AssertPipeable<
    FromF extends AnyMapper,
    ToF extends AnyMapper
> = (
    IsPipeable<FromF, ToF> extends true ?
    ToF :
    [OutputOf<FromF>, "does not extend", MappableInputOf<ToF>]
);