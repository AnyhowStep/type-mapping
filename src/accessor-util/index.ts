export interface AccessorDescriptor {
    configurable : boolean;
    enumerable : boolean;
    get : undefined|(() => any);
    set : undefined|((v: any) => void);
}
export interface AccessorItem<T extends Object> {
    name : keyof T,
    descriptor : AccessorDescriptor,
}

export function isAccessorDescriptor (descriptor : PropertyDescriptor|null|undefined) : descriptor is AccessorDescriptor {
    if (descriptor == null) {
        return false;
    }
    return (
        descriptor.hasOwnProperty("get") &&
        descriptor.hasOwnProperty("set") &&
        descriptor.hasOwnProperty("configurable") &&
        descriptor.hasOwnProperty("enumerable") &&
        (
            typeof descriptor.get == "function" ||
            typeof descriptor.get == "undefined"
        ) &&
        (
            typeof descriptor.set == "function" ||
            typeof descriptor.set == "undefined"
        ) &&
        typeof descriptor.configurable == "boolean" &&
        typeof descriptor.enumerable == "boolean"
    );
}
const BUILT_IN_PROTOTYPES = [
    Object.prototype,
    Date.prototype,
];
function isBuiltInPrototype (obj : Object) {
    return BUILT_IN_PROTOTYPES.indexOf(obj) >= 0;
}
export function getOwnAccessors<T extends Object> (obj : T) {
    const arr : (keyof T)[] = Object.getOwnPropertyNames(obj) as any;
    const result : AccessorItem<T>[] = [];
    for (let k of arr) {
        const descriptor = Object.getOwnPropertyDescriptor(obj, k);
        if (isAccessorDescriptor(descriptor)) {
            result.push({
                name : k,
                descriptor : descriptor,
            });
        }
    }
    return result;
}

export function getAllAccessors<T extends Object> (obj : T) {
    const result : AccessorItem<T>[] = [];
    while (!isBuiltInPrototype(obj)) {
        result.push(...getOwnAccessors(obj));
        obj = Object.getPrototypeOf(obj);
    }
    return result;
}

export function getAccessor (obj : Object, name : PropertyKey) : AccessorDescriptor|undefined {
    if (isBuiltInPrototype(obj)) {
        return undefined;
    }
    const potentialResult = Object.getOwnPropertyDescriptor(obj, name);
    if (potentialResult == undefined || !isAccessorDescriptor(potentialResult)) {
        return getAccessor(Object.getPrototypeOf(obj), name);
    }
    return potentialResult;
}
