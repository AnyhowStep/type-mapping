//This declaration lets us avoid using @types/node
declare const Buffer: {
    new(...args : unknown[]): Buffer;
};

function tryFindBufferCtor () {
    try {
        return Buffer;
    } catch (_err) {
        return undefined;
    }
}
let cachedBufferCtor : (typeof Buffer)|undefined|"uninitialized" = "uninitialized";
export function tryGetBufferCtor () : (typeof Buffer)|undefined {
    if (cachedBufferCtor == "uninitialized") {
        cachedBufferCtor = tryFindBufferCtor();
    }
    return cachedBufferCtor;
}
export function isInstanceOfBuffer (mixed : unknown) : mixed is Buffer {
    const ctor = tryFindBufferCtor();
    if (ctor == undefined) {
        return false;
    }
    return (mixed instanceof ctor);
}