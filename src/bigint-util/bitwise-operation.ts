import {isBigIntNativelySupported, getBigIntFactoryFunctionOrError} from "../type-util";
import {JSBI} from "./jsbi";

export function leftShift (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) << BigInt(b);
            } else {
                return BigInt(a) << b;
            }
        } else {
            if (typeof b == "number") {
                return a << BigInt(b);
            } else {
                return a << b;
            }
        }
    }
    const result = JSBI.leftShift(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function signedRightShift (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) >> BigInt(b);
            } else {
                return BigInt(a) >> b;
            }
        } else {
            if (typeof b == "number") {
                return a >> BigInt(b);
            } else {
                return a >> b;
            }
        }
    }
    const result = JSBI.signedRightShift(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function bitwiseAnd (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) & BigInt(b);
            } else {
                return BigInt(a) & b;
            }
        } else {
            if (typeof b == "number") {
                return a & BigInt(b);
            } else {
                return a & b;
            }
        }
    }
    const result = JSBI.bitwiseAnd(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function bitwiseOr (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) | BigInt(b);
            } else {
                return BigInt(a) | b;
            }
        } else {
            if (typeof b == "number") {
                return a | BigInt(b);
            } else {
                return a | b;
            }
        }
    }
    const result = JSBI.bitwiseOr(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function bitwiseXor (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) ^ BigInt(b);
            } else {
                return BigInt(a) ^ b;
            }
        } else {
            if (typeof b == "number") {
                return a ^ BigInt(b);
            } else {
                return a ^ b;
            }
        }
    }
    const result = JSBI.bitwiseXor(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function bitwiseNot (a : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            return ~BigInt(a);
        } else {
            return ~a;
        }
    }
    const result = JSBI.bitwiseNot(
        JSBI.BigInt(a.toString())
    );
    return BigInt(result.toString());
}
