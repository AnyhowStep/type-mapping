import {isBigIntNativelySupported} from "../type-util";
import {JSBI} from "./jsbi";

/**
    Assumes BigInt.toString() is implemented correctly.

    Assummes we won't get strings like,

    + "-0000"
    + "-qwerty"
    + "123.123"
*/

export function compare (a : bigint|number, b : bigint|number) : number {
    if (isBigIntNativelySupported()) {
        return (
            (typeof a == "number" && isNaN(a)) ?
            NaN :
            (typeof b == "number" && isNaN(b)) ?
            NaN :
            a < b ?
            -1 :
            a > b ?
            1 :
            0
        );
    }
    if (typeof a == "number") {
        if (typeof b == "number") {
            return a - b;
        } else {
            const cmp = JSBI.__compareToNumber(
                JSBI.BigInt(b.toString()),
                a
            );
            return cmp;
        }
    } else {
        if (typeof b == "number") {
            const cmp = JSBI.__compareToNumber(
                JSBI.BigInt(a.toString()),
                b
            );
            return cmp;
        } else {
            return JSBI.__compareToBigInt(
                JSBI.BigInt(a.toString()),
                JSBI.BigInt(b.toString())
            );
        }
    }
}

export function lessThan (a : bigint|number, b : bigint|number) : boolean {
    return compare(a, b) < 0;
}
export function greaterThan (a : bigint|number, b : bigint|number) : boolean {
    return compare(a, b) > 0;
}
export function equal (a : bigint|number, b : bigint|number) : boolean {
    return compare(a, b) == 0;
}
export function lessThanOrEqual (a : bigint|number, b : bigint|number) : boolean {
    return compare(a, b) <= 0;
}
export function greaterThanOrEqual (a : bigint|number, b : bigint|number) : boolean {
    return compare(a, b) >= 0;
}
export function subOneImpl (str : string) : string {
    if (str[0] == "-") {
        const result = addOneImpl(str.substr(1));
        return "-" + result;
    }

    if (str == "0") {
        return "-1";
    }

    const digits = str
        .split("")
        .map(s => parseInt(s));

    for (let i=digits.length-1; i>=0; --i) {
        const d = digits[i];
        if (d == 0) {
            digits[i] = 9;
        } else {
            if (i == 0 && digits[i] == 1) {
                digits.shift();
            } else {
                digits[i] = d-1;
            }
            break;
        }
    }

    if (digits.length == 0) {
        return "0";
    } else {
        return digits.join("");
    }
}
export function addOneImpl (str : string) : string {
    JSBI.__absoluteAddOne
    if (str[0] == "-") {
        const result = subOneImpl(str.substr(1));
        if (result == "0") {
            return result;
        } else {
            return "-" + result;
        }
    }

    const digits = str
        .split("")
        .map(s => parseInt(s));
    let carry = true;

    for (let i=digits.length-1; i>=0; --i) {
        const d = digits[i];
        if (d == 9) {
            digits[i] = 0;
        } else {
            digits[i] = d+1;
            carry = false;
            break;
        }
    }

    if (carry) {
        digits.unshift(1);
    }

    return digits.join("");
}