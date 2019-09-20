import {isBigIntNativelySupported} from "../type-util";

/**
    Assumes BigInt.toString() is implemented correctly.

    Assummes we won't get strings like,

    + "-0000"
    + "-qwerty"
    + "123.123"
*/

export function lessThan (a : bigint|number, b : bigint|number) {
    if (isBigIntNativelySupported()) {
        return a < b;
    }
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr == bStr) {
        return false;
    }
    const aNeg = (aStr[0] == "-");
    const bNeg = (bStr[0] == "-");
    if (aNeg) {
        if (bNeg) {
            //Both negative
            if (aStr.length > bStr.length) {
                //Eg. a = -100, b = -99
                return true;
            } else if (aStr.length < bStr.length) {
                //Eg. a = -99, b = -100
                return false;
            } else {
                return aStr.localeCompare(bStr) > 0;
            }
        } else {
            //Eg. a = -5, b = 100
            return true;
        }
    } else {
        if (bNeg) {
            //Eg. a = 100, b = -5
            return false;
        } else {
            //Both positive
            if (aStr.length < bStr.length) {
                //Eg. a = 99, b = 100
                return true;
            } else if (aStr.length > bStr.length) {
                //Eg. a = 100, b = 99
                return false;
            } else {
                return aStr.localeCompare(bStr) < 0;
            }
        }
    }
}
export function greaterThan (a : bigint|number, b : bigint|number) {
    if (isBigIntNativelySupported()) {
        return a > b;
    }
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr == bStr) {
        return false;
    }
    return lessThan(b, a);
}
export function equal (a : bigint|number, b : bigint|number) {
    if (isBigIntNativelySupported()) {
        return a == b;
    }
    return a.toString() == b.toString();
}
export function lessThanOrEqual (a : bigint|number, b : bigint|number) {
    if (isBigIntNativelySupported()) {
        return a <= b;
    }
    return (
        equal(a, b) ||
        lessThan(a, b)
    );
}
export function greaterThanOrEqual (a : bigint|number, b : bigint|number) {
    if (isBigIntNativelySupported()) {
        return a >= b;
    }
    return (
        equal(a, b) ||
        greaterThan(a, b)
    );
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