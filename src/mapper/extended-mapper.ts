/**
    An `ExtendedMapper<>` is a `Mapper<>` that takes additional
    arguments beyond those of `Mapper<>`.

    @see Mapper
*/
export type ExtendedMapper<HandledInputT, OutputT, ArgsT extends any[]> = (
    (name : string, mixed : HandledInputT, ...args : ArgsT) => OutputT
);
export type AnyExtendedMapper = (
    ExtendedMapper<any, any, any[]>
);