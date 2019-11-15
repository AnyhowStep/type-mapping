import {isBigIntNativelySupported, getBigIntFactoryFunctionOrError} from "../type-util";
import {JSBI} from "./jsbi";

export function add (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) + BigInt(b);
            } else {
                return BigInt(a) + b;
            }
        } else {
            if (typeof b == "number") {
                return a + BigInt(b);
            } else {
                return a + b;
            }
        }
    }
    const result = JSBI.add(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function addMany (a : bigint|number, b : bigint|number, ...rest : (bigint|number)[]) : bigint {
    let result = add(a, b);
    for (const ele of rest) {
        result = add(result, ele);
    }
    return result;
}

export function sub (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) - BigInt(b);
            } else {
                return BigInt(a) - b;
            }
        } else {
            if (typeof b == "number") {
                return a - BigInt(b);
            } else {
                return a - b;
            }
        }
    }
    const result = JSBI.subtract(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function mul (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) * BigInt(b);
            } else {
                return BigInt(a) * b;
            }
        } else {
            if (typeof b == "number") {
                return a * BigInt(b);
            } else {
                return a * b;
            }
        }
    }
    const result = JSBI.multiply(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function div (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) / BigInt(b);
            } else {
                return BigInt(a) / b;
            }
        } else {
            if (typeof b == "number") {
                return a / BigInt(b);
            } else {
                return a / b;
            }
        }
    }
    const result = JSBI.divide(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}

export function mod (a : bigint|number, b : bigint|number) : bigint {
    const BigInt = getBigIntFactoryFunctionOrError();
    if (isBigIntNativelySupported()) {
        if (typeof a == "number") {
            if (typeof b == "number") {
                return BigInt(a) % BigInt(b);
            } else {
                return BigInt(a) % b;
            }
        } else {
            if (typeof b == "number") {
                return a % BigInt(b);
            } else {
                return a % b;
            }
        }
    }
    const result = JSBI.remainder(
        JSBI.BigInt(a.toString()),
        JSBI.BigInt(b.toString())
    );
    return BigInt(result.toString());
}
