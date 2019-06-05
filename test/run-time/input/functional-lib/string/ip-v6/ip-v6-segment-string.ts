import * as tape from "tape";
import * as tm from "../../../../../../dist";

function zeroPadLeft (str : string, length : number) {
    if (str.length >= length) {
        return str;
    }
    return "0".repeat(length - str.length) + str;
}
tape(__filename, t => {
    const f = tm.ipV6SegmentString();

    const hexUpper = [
        "0", "1", "2", "3",
        "4", "5", "6", "7",
        "8", "9", "A", "B",
        "C", "D", "E", "F",
    ];

    //Zero-character
    t.false(tm.tryMap(f, "x", "").success);

    //Single-character
    for (let hex of hexUpper) {
        for (let length=1; length<=4; ++length) {
            t.deepEqual(f("x", zeroPadLeft(hex, length)), hex.toLowerCase());
            t.deepEqual(f("x", zeroPadLeft(hex.toLowerCase(), length)), hex.toLowerCase());
        }
    }

    //Double-character
    for (let hex of hexUpper) {
        const hex2 = "A" + hex;
        for (let length=2; length<=4; ++length) {
            t.deepEqual(f("x", zeroPadLeft(hex2, length)), hex2.toLowerCase());
            t.deepEqual(f("x", zeroPadLeft(hex2.toLowerCase(), length)), hex2.toLowerCase());
        }
    }

    //Triple-character
    for (let hex of hexUpper) {
        const hex3 = "Aa" + hex;
        for (let length=3; length<=4; ++length) {
            t.deepEqual(f("x", zeroPadLeft(hex3, length)), hex3.toLowerCase());
            t.deepEqual(f("x", zeroPadLeft(hex3.toLowerCase(), length)), hex3.toLowerCase());
        }
    }

    //Quadruple-character
    for (let hex of hexUpper) {
        const hex4 = "AaA" + hex;
        t.deepEqual(f("x", hex4), hex4.toLowerCase());
        t.deepEqual(f("x", hex4), hex4.toLowerCase());
    }

    //Quintiple-character
    t.false(tm.tryMap(f, "x", "aaaaa").success);
    t.false(tm.tryMap(f, "x", "00000").success);

    t.end();
});
