import {AnySafeMapper, OutputOf} from "../mapper";
import {getAccessor, isAccessorDescriptor} from "../accessor-util";
import {ExtractKeyOfType} from "./extract-key-of-type";
import {getCtorName} from "../type-util";

export type PropDecorator<F extends AnySafeMapper> = (
    <
        ObjT,
        K extends ExtractKeyOfType<ObjT, OutputOf<F>>
    >(target : ObjT, propertyKey : K) => void
);
export function prop<F extends AnySafeMapper> (f : F) : (
    PropDecorator<F>
) {
    const result = <
        ObjT,
        K extends ExtractKeyOfType<ObjT, OutputOf<F>>
    >(target : ObjT, propertyKey : K) : void => {
        /*
            Implementation copied over from schema-decorator.
            The code isn't too well-written and kind of confusing.
        */
        const propertyName = (typeof propertyKey == "string") ?
            propertyKey :
            `Symbol(${propertyKey.toString()})`;
        const privateName = `____hijacked-by-type-mapping-${propertyName}`;

        const ctorName = getCtorName((target as any).constructor);
        const fullName = `${ctorName}.${propertyName}`;
        /*
            We call this `superAccessorGenerator` because
            calling `.set()` on this may trigger the base class'
            decorator that may create another accessor on the base class.

            `superSetter` below is the `.set()` of the base class,
            if it exists.

            We need to also call the base class' `.set()`
            because there may be other mappers running in the
            base class.
        */
        const superAccessorGenerator = getAccessor(target, propertyKey);
        Object.defineProperty(target, propertyKey, {
            get : function (this : any) {
                return this[privateName];
            },
            set : function (this : any, mixed : any) {
                //If we are here, we have the accessor defined on the class prototype,
                //but not on the instance itself.
                //We want to preserve the behaviour of Object.keys(),
                //So, we need to define the accessor on the instance.

                let superSetter : undefined|((v: any) => void) = undefined;
                if (superAccessorGenerator != undefined && superAccessorGenerator.set != undefined) {
                    superAccessorGenerator.set.bind(this)(mixed);
                    const accessor = Object.getOwnPropertyDescriptor(this, propertyKey);
                    if (!isAccessorDescriptor(accessor) || accessor.set == undefined) {
                        throw new Error(`Expected ${fullName} to be an accessor and have a "set()" method`);
                    }
                    superSetter = accessor.set.bind(this);
                }

                //Set the value on the instance first,
                //We define a property that is not enumerable,
                //So it does not show up in Object.keys().
                //We don't want this property to show up because
                //its name is `privateName`, not the "original" name.
                if (superSetter == undefined) {
                    Object.defineProperty(this, privateName, {
                        value : f(fullName, mixed),
                        writable : true,
                        enumerable : false,
                    });
                } else {
                    superSetter(f(fullName, mixed));
                }
                //We define the accessor that should be used from now on
                //And will be enumerable with Object.keys(instance)
                Object.defineProperty(this, propertyName, {
                    get : function (this : any) {
                        return this[privateName];
                    },
                    set : function (this : any, mixed : any) {
                        if (superSetter == undefined) {
                            this[privateName] = f(fullName, mixed);
                        } else {
                            superSetter(f(fullName, mixed));
                        }
                    },
                    enumerable : true,
                    configurable : true,
                });
            },
            enumerable : true,
        });
    };
    return result as PropDecorator<F>;
}

/*
class Clazz {
    @prop(() => "1")
    prop0 : number = 3;
}
const c = new Clazz();
//*/