//https://stackoverflow.com/questions/21553528/how-to-test-for-equality-in-arraybuffer-dataview-and-typedarray
function dataViewsAreEqual (a : DataView, b : DataView) : boolean {
    if (a.byteLength !== b.byteLength) {
        return false;
    }

    for (let i=0; i<a.byteLength; ++i) {
        if (a.getUint8(i) !== b.getUint8(i)) {
            return false;
        }
    }
    return true;
}

/**
 * Allows you to compare,
 * + `Buffer` to `Buffer`
 * + `Uint8Array` to `Uint8Array`
 * + `Buffer` to `Uint8Array`
 * + `Uint8Array` to `Buffer`
 */
export function equals (
    a : { buffer : ArrayBufferLike, byteOffset : number, byteLength : number },
    b : { buffer : ArrayBufferLike, byteOffset : number, byteLength : number }
) : boolean {
    return dataViewsAreEqual(
        new DataView(a.buffer, a.byteOffset, a.byteLength),
        new DataView(b.buffer, b.byteOffset, b.byteLength)
    );
}