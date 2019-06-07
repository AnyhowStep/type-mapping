import {AnySafeMapper, OutputOf} from "../mapper";
import {getCtorName} from "../type-util";
import {ToRequiredParameters} from "./to-required-parameters";

export type ExtractKeyWithParams<ObjT, ArgsT extends AnySafeMapper[]> = (
    {
        [k in Extract<keyof ObjT, string|symbol>] : (
            (
                { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
            ) extends (
                ToRequiredParameters<Extract<ObjT[k], (...args : any[]) => any>>
            ) ?
            (
                (
                    ToRequiredParameters<Extract<ObjT[k], (...args : any[]) => any>>
                ) extends (
                    { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
                ) ?
                k :
                never
            ) :
            never
        )
    }[Extract<keyof ObjT, string|symbol>]
);
export type MethodDecorator<ArgsT extends AnySafeMapper[]> = (
    <
        ObjT,
        K extends keyof ObjT
    >(
        target : ObjT,
        propertyKey : (
            K extends ExtractKeyWithParams<ObjT, ArgsT> ?
            K :
            [
                K,
                "has parameters of type",
                Parameters<Extract<ObjT[K], (...args : any[]) => any>>,
                "not exactly",
                { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
            ]
        ),
        descriptor : TypedPropertyDescriptor<ObjT[K]>
    ) => void
);
export function method<ArgsT extends AnySafeMapper[]> (...mappers : ArgsT) : (
    MethodDecorator<ArgsT>
) {
    const result = <
        ObjT,
        K extends keyof ObjT
    >(
        target : ObjT,
        propertyKey : (
            K extends ExtractKeyWithParams<ObjT, ArgsT> ?
            K :
            [
                K,
                "has parameters of type",
                Parameters<Extract<ObjT[K], (...args : any[]) => any>>,
                "not exactly",
                { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
            ]
        ),
        descriptor : TypedPropertyDescriptor<ObjT[K]>
    ) : void => {
        if (mappers.length == 0) {
            //Nothing to validate.
            return;
        }

        const propertyName = (typeof propertyKey == "string") ?
            propertyKey :
            `Symbol(${propertyKey.toString()})`;
        const ctorName = getCtorName((target as any).constructor);
        const fullName = `${ctorName}.${propertyName}`;
        const originalMethod = descriptor.value;
        if (!(originalMethod instanceof Function)) {
            throw new Error(`Method ${fullName} not found`);
        }
        descriptor.value = (function (this : any, ...args : any[]) {
            const max = Math.max(args.length, originalMethod.length);

            for (let i=0; i<max; ++i) {
                const mapper = (i<mappers.length) ?
                    mappers[i] :
                    //Probably a rest parameter
                    mappers[mappers.length-1];
                if (i<args.length) {
                    args[i] = mapper(`${fullName}(#${i})`, args[i]);
                } else {
                    args.push(mapper(`${fullName}(#${i})`, undefined));
                }
            }

            if (originalMethod != undefined) {
                return originalMethod.apply(this, args);
            } else {
                return undefined;
            }
        }) as unknown as ObjT[K];
    };
    return result;
}
/*
class Clazz {
    @method(() => 1, () => "")
    foo (arg0 : number, arg1 : string) {
    }
    //Rest params are a bit iffy
    @method(() => 1, ...[() => ""])
    foo2 (arg0 : number, ...arg1 : string[]) {
    }

    @setter()
    get x () {
        return 5;
    }

    @setter(() => 1, () => "")
    set name (v : string) {
        console.log(v);
    }
}
type wtf = ExtractKeyWithParams<Clazz, [() => 1]>
type c_name = Clazz["name"]
const c = new Clazz();
type p = Parameters<(arg0 : number, ...args : string[]) => void>
type p0 = p[0];
type p1 = p[1];
type p2 = p[2];
type l = p["length"];
//*/