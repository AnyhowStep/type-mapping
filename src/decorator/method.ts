import {AnySafeMapper, OutputOf} from "../mapper";
import {getCtorName} from "../type-util";

export type ExtractKeyWithParams<ObjT, ArgsT extends AnySafeMapper[]> = (
    {
        [k in Extract<keyof ObjT, string|symbol>] : (
            (
                Parameters<Extract<ObjT[k], (...args : any[]) => any>>
            ) extends (
                { [index in keyof ArgsT] : OutputOf<Extract<ArgsT[index], AnySafeMapper>> }
            ) ?
            k :
            never
        )
    }[Extract<keyof ObjT, string|symbol>]
);
export type MethodDecorator<ArgsT extends AnySafeMapper[]> = (
    <
        ObjT,
        K extends ExtractKeyWithParams<ObjT, ArgsT>
    >(target : ObjT, propertyKey : K, descriptor : TypedPropertyDescriptor<ObjT[K]>) => void
);
export function method<ArgsT extends AnySafeMapper[]> (...mappers : ArgsT) : (
    MethodDecorator<ArgsT>
) {
    const result = <
        ObjT,
        K extends ExtractKeyWithParams<ObjT, ArgsT>
    >(target : ObjT, propertyKey : K, descriptor : TypedPropertyDescriptor<ObjT[K]>) : void => {
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
        descriptor.value = (function (this : any, ...args : any[]) {
            for (let i=0; i<args.length; ++i) {
                if (i<mappers.length) {
                    args[i] = mappers[i](`${fullName}(#${i})`, args[i]);
                } else {
                    //Probably a rest parameter?
                    args[i] = mappers[mappers.length-1](`${fullName}(#${i})`, args[i]);
                }
            }

            if (originalMethod != undefined) {
                return (originalMethod as any).apply(this, args);
            } else {
                return undefined;
            }
        }) as unknown as ObjT[K];
    };
    return result as MethodDecorator<ArgsT>;
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