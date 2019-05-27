export interface BigIntFactoryFunction {
    (x : string|number|bigint) : bigint;
    possiblyInstanceOfBigInt (x : unknown) : boolean;
    bigIntNative : boolean;
}
/**
    Unsafe because using this type may throw errors
*/
interface UnsafeBigIntFactory {
    (x : string|number|bigint) : bigint;
    new (x : string|number|bigint) : bigint;
}

/**
    This may or may not exist on the browser!
*/
declare const BigInt : UnsafeBigIntFactory;

function createPossiblyInstanceOfBigInt (x : bigint) : (x : unknown) => boolean {
    if (x == undefined) {
        return () => false;
    }

    try {
        const ctor = Object.getPrototypeOf(x).constructor;
        if (typeof ctor != "function") {
            return () => false;
        }
        //Make sure `instanceof` checks don't throw
        ({} instanceof ctor);
        return (x : unknown) => {
            return (x instanceof ctor);
        };
    } catch (_err) {
        return () => false;
    }
}

function tryFindBigIntFactoryFunction () : BigIntFactoryFunction|undefined {
    try {
        const unsafeFactory = BigInt;
        if (typeof unsafeFactory != "function") {
            return undefined;
        }

        try {
            const bigInt = unsafeFactory(0);
            const possiblyInstanceOfBigInt = createPossiblyInstanceOfBigInt(bigInt);
            const wrapper : BigIntFactoryFunction = ((x : string|number|bigint) : bigint => {
                return unsafeFactory(x);
            }) as any;
            wrapper.possiblyInstanceOfBigInt = possiblyInstanceOfBigInt;
            wrapper.bigIntNative = (typeof bigInt == "bigint");
            return wrapper;
        } catch (_err) {
        }

        try {
            const possiblyInstanceOfBigInt = createPossiblyInstanceOfBigInt(new unsafeFactory(0));
            const wrapper : BigIntFactoryFunction = ((x : string|number|bigint) : bigint => {
                return new unsafeFactory(x);
            }) as any;
            wrapper.possiblyInstanceOfBigInt = possiblyInstanceOfBigInt;
            //Had to use `new`; not supported
            wrapper.bigIntNative = false;
            return wrapper;
        } catch (_err) {
        }

        return undefined;
    } catch (_err) {
        //No BigInt, no polyfill
        return undefined;
    }
}

let cachedBigIntFactoryFunction : BigIntFactoryFunction|undefined|"uninitialized" = "uninitialized";
export function tryGetBigIntFactoryFunction () : BigIntFactoryFunction|undefined {
    if (cachedBigIntFactoryFunction == "uninitialized") {
        cachedBigIntFactoryFunction = tryFindBigIntFactoryFunction();
    }
    return cachedBigIntFactoryFunction;
}
export function getBigIntFactoryFunctionOrError () : BigIntFactoryFunction {
    const result = tryGetBigIntFactoryFunction();
    if (result == undefined) {
        throw new Error("No native or polyfilled bigint implementation found; set the `BigInt` variable on the `globalThis`/`window`/`global` scope to a polyfilled implementation");
    }
    return result;
}
export function isBigIntNativelySupported () : boolean {
    const factory = tryGetBigIntFactoryFunction();
    if (factory == undefined) {
        return false;
    }
    return factory.bigIntNative;
}