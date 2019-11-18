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

export function equals (a : ArrayBufferLike, b : ArrayBufferLike) : boolean {
    return dataViewsAreEqual(new DataView(a), new DataView(b));
}