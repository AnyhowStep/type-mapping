import {AnySafeMapper, OutputOf} from "../mapper";
import {ToRequiredParameters} from "./to-required-parameters";

export type HasParamsOfType<
    FuncT extends (...args : any[]) => any,
    ArgsT extends AnySafeMapper[]
> = (
    (
        { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
    ) extends (
        ToRequiredParameters<FuncT>
    ) ?
    (
        (
            ToRequiredParameters<FuncT>
        ) extends (
            { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
        ) ?
        true :
        false
    ) :
    false
);
export type FunctionDecorator<ArgsT extends AnySafeMapper[]> = (
    <
        FuncT extends (...args : any[]) => any
    >(
        target : (
            HasParamsOfType<FuncT, ArgsT> extends true ?
            FuncT :
            [
                FuncT,
                "has parameters of type",
                Parameters<FuncT>,
                "not exactly",
                { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
            ]
        )
    ) => FuncT
);
export function func<ArgsT extends AnySafeMapper[]> (...mappers : ArgsT) : (
    FunctionDecorator<ArgsT>
) {
    const factory = <
        FuncT extends (...args : any[]) => any
    >(
        target : (
            HasParamsOfType<FuncT, ArgsT> extends true ?
            FuncT :
            [
                FuncT,
                "has parameters of type",
                Parameters<FuncT>,
                "not exactly",
                { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
            ]
        )
    ) : FuncT => {
        if (mappers.length == 0) {
            //Nothing to validate.
            return target as FuncT;
        }
        const name : string = (typeof (target as any).name == "string") ?
            typeof (target as any).name :
            "[Anonymous function]";
        const result = function (this : any, ...args : any[]) {
            const max = Math.max(args.length, target.length);

            for (let i=0; i<max; ++i) {
                const mapper = (i<mappers.length) ?
                    mappers[i] :
                    //Probably a rest parameter
                    mappers[mappers.length-1];
                if (i<args.length) {
                    args[i] = mapper(`${name}(#${i})`, args[i]);
                } else {
                    args.push(mapper(`${name}(#${i})`, undefined));
                }
            }

            return (target as any).apply(this, args);
        };
        return result as FuncT;
    };
    return factory;
}