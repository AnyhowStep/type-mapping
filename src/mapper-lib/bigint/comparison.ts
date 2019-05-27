import {pipe} from "../operator";
import {bigInt} from "./bigint";
import {SafeMapper} from "../../mapper";
import {literal} from "../literal";
import {toLiteralStr, isBigInt} from "../../type-util";
import {
    greaterThan,
    lessThan,
    greaterThanOrEqual,
    lessThanOrEqual,
    equal,
} from "../../bigint-util";
export function bigIntGt (x : bigint) : SafeMapper<bigint> {
    return pipe(
        bigInt(),
        (name : string, num : bigint) : bigint => {
            if (greaterThan(num, x)) {
                return num;
            } else {
                throw new Error(`${name} must be greater than ${toLiteralStr(x)}`);
            }
        }
    );
}

export function bigIntLt (x : bigint) : SafeMapper<bigint> {
    return pipe(
        bigInt(),
        (name : string, num : bigint) : bigint => {
            if (lessThan(num, x)) {
                return num;
            } else {
                throw new Error(`${name} must be less than ${toLiteralStr(x)}`);
            }
        }
    );
}

export function bigIntGtEq (x : bigint) : SafeMapper<bigint> {
    return pipe(
        bigInt(),
        (name : string, num : bigint) : bigint => {
            if (greaterThanOrEqual(num, x)) {
                return num;
            } else {
                throw new Error(`${name} must be greater than, or equal to ${toLiteralStr(x)}`);
            }
        }
    );
}

export function bigIntLtEq (x : bigint) : SafeMapper<bigint> {
    return pipe(
        bigInt(),
        (name : string, num : bigint) : bigint => {
            if (lessThanOrEqual(num, x)) {
                return num;
            } else {
                throw new Error(`${name} must be less than, or equal to ${toLiteralStr(x)}`);
            }
        }
    );
}

export function bigIntInclusiveRange (args : {
    min? : bigint,
    max? : bigint,
}) : SafeMapper<bigint> {
    if (isBigInt(args.min)) {
        if (isBigInt(args.max)) {
            if (greaterThan(args.min, args.max)) {
                throw new Error(`"min" cannot be greater than "max"`);
            } else if (equal(args.min, args.max)) {
                return literal(args.min);
            } else {
                return pipe(
                    bigIntGtEq(args.min),
                    bigIntLtEq(args.max)
                );
            }
        } else {
            return bigIntGtEq(args.min);
        }
    } else if (isBigInt(args.max)) {
        return bigIntLtEq(args.max);
    } else {
        return bigInt();
    }
}