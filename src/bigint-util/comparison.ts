export function lessThan (a : bigint, b : bigint) {
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
export function greaterThan (a : bigint, b : bigint) {
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr == bStr) {
        return false;
    }
    return lessThan(b, a);
}
export function equal (a : bigint, b : bigint) {
    return a.toString() == b.toString();
}
export function lessThanOrEqual (a : bigint, b : bigint) {
    return (
        equal(a, b) ||
        lessThan(a, b)
    );
}
export function greaterThanOrEqual (a : bigint, b : bigint) {
    return (
        equal(a, b) ||
        greaterThan(a, b)
    );
}