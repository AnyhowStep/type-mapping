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
    addOneImpl,
} from "../../bigint-util";
import {makeMappingError} from "../../error-util";
import {ErrorCode} from "../../error-code";

export function bigIntGt (x : bigint) : SafeMapper<bigint> {
    return pipe(
        bigInt(),
        (name : string, num : bigint) : bigint => {
            if (greaterThan(num, x)) {
                return num;
            } else {
                throw makeMappingError({
                    message : `${name} must be greater than ${toLiteralStr(x)}`,
                    inputName : name,
                    actualValue : num,
                    expected : `greater than ${toLiteralStr(x)}`,
                    expectedMeta : {
                        errorCode : ErrorCode.EXPECTED_GREATER_THAN,
                        gt : x,
                    },
                });
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
                throw makeMappingError({
                    message : `${name} must be less than ${toLiteralStr(x)}`,
                    inputName : name,
                    actualValue : num,
                    expected : `less than ${toLiteralStr(x)}`,
                    expectedMeta : {
                        errorCode : ErrorCode.EXPECTED_LESS_THAN,
                        lt : x,
                    },
                });
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
                throw makeMappingError({
                    message : `${name} must be greater than, or equal to ${toLiteralStr(x)}`,
                    inputName : name,
                    actualValue : num,
                    expected : `greater than, or equal to ${toLiteralStr(x)}`,
                    expectedMeta : {
                        errorCode : ErrorCode.EXPECTED_GREATER_THAN_OR_EQUAL_TO,
                        gtEq : x,
                    },
                });
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
                throw makeMappingError({
                    message : `${name} must be less than, or equal to ${toLiteralStr(x)}`,
                    inputName : name,
                    actualValue : num,
                    expected : `less than, or equal to ${toLiteralStr(x)}`,
                    expectedMeta : {
                        errorCode : ErrorCode.EXPECTED_LESS_THAN_OR_EQUAL_TO,
                        ltEq : x,
                    },
                });
            }
        }
    );
}

export function bigIntRange (args : {
    gt? : bigint,
    lt? : bigint,
    gtEq? : bigint,
    ltEq? : bigint,
}) : SafeMapper<bigint> {
    const min = (
        (isBigInt(args.gt)) ?
        (
            (isBigInt(args.gtEq)) ?
            (
                (greaterThanOrEqual(args.gt, args.gtEq)) ?
                {
                    f : bigIntGt(args.gt),
                    inclusive : false,
                    value : args.gt,
                } :
                {
                    f : bigIntGtEq(args.gtEq),
                    inclusive : true,
                    value : args.gtEq,
                }
            ) :
            {
                f : bigIntGt(args.gt),
                inclusive : false,
                value : args.gt,
            }
        ) :
        (
            (isBigInt(args.gtEq)) ?
            {
                f : bigIntGtEq(args.gtEq),
                inclusive : true,
                value : args.gtEq,
            } :
            undefined
        )
    );
    const max = (
        (isBigInt(args.lt)) ?
        (
            (isBigInt(args.ltEq)) ?
            (
                (lessThanOrEqual(args.lt, args.ltEq)) ?
                {
                    f : bigIntLt(args.lt),
                    inclusive : false,
                    value : args.lt,
                } :
                {
                    f : bigIntLtEq(args.ltEq),
                    inclusive : true,
                    value : args.ltEq,
                }
            ) :
            {
                f : bigIntLt(args.lt),
                inclusive : false,
                value : args.lt,
            }
        ) :
        (
            (isBigInt(args.ltEq)) ?
            {
                f : bigIntLtEq(args.ltEq),
                inclusive : true,
                value : args.ltEq,
            } :
            undefined
        )
    );

    if (min == undefined) {
        if (max == undefined) {
            return bigInt();
        } else {
            return max.f;
        }
    } else {
        if (max == undefined) {
            return min.f;
        } else {
            if (greaterThan(min.value, max.value)) {
                throw new Error(`Min value cannot be greater than max value`);
            } else if (equal(min.value, max.value)) {
                if (min.inclusive && max.inclusive) {
                    return literal(min.value);
                } else {
                    throw new Error(`Min value cannot be equal to max value unless using gtEq and ltEq`);
                }
            } else {
                if (
                    addOneImpl(min.value.toString()) == max.value.toString() &&
                    !min.inclusive &&
                    !max.inclusive
                ) {
                    throw new Error(`There is no bigint 'x' where: ${min.value.toString()} < x < ${max.value.toString()}`);
                }
                return pipe(
                    min.f,
                    max.f
                );
            }
        }
    }
}