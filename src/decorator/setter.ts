import {AnySafeMapper, OutputOf} from "../mapper";
import {getCtorName} from "../type-util";
import {ExtractKeyOfType} from "./extract-key-of-type";

export type SetterDecorator<F extends AnySafeMapper> = (
    <
        ObjT,
        K extends ExtractKeyOfType<ObjT, OutputOf<F>>
    >(target : ObjT, propertyKey : K, descriptor : TypedPropertyDescriptor<ObjT[K]>) => void
);
export function setter<F extends AnySafeMapper> (f : F) : (
    SetterDecorator<F>
) {
    const result = <
        ObjT,
        K extends ExtractKeyOfType<ObjT, OutputOf<F>>
    >(target : ObjT, propertyKey : K, descriptor : TypedPropertyDescriptor<ObjT[K]>) : void => {
        const propertyName = (typeof propertyKey == "string") ?
            propertyKey :
            `Symbol(${propertyKey.toString()})`;
        const ctorName = getCtorName((target as any).constructor);
        const fullName = `${ctorName}.${propertyName}`;
        const originalMethod = descriptor.value;
        descriptor.value = (function (this : any, ...args : any[]) {
            for (let i=0; i<args.length; ++i) {
                args[i] = f(fullName, args[i]);
            }

            if (originalMethod != undefined) {
                return (originalMethod as any).apply(this, args);
            } else {
                return undefined;
            }
        }) as unknown as ObjT[K];
    };
    return result as SetterDecorator<F>;
}
/*
class Clazz {
    @setter(() => "1")
    set name (v : string) {
        console.log(v);
    }
}
//*/