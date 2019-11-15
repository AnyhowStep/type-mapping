import {ParseResult} from "./try-parse";
import * as BigIntUtil from "../bigint-util";

export enum ZeroEqualityAlgorithm {
    NEGATIVE_AND_POSITIVE_ZERO_ARE_EQUAL = "NEGATIVE_AND_POSITIVE_ZERO_ARE_EQUAL",
    NEGATIVE_AND_POSITIVE_ZERO_NOT_EQUAL = "NEGATIVE_AND_POSITIVE_ZERO_NOT_EQUAL",
}
export function isEqual (
    a : ParseResult,
    b : ParseResult,
    zeroEqualityAlgorithm : ZeroEqualityAlgorithm
) : boolean {
    if (
        zeroEqualityAlgorithm == ZeroEqualityAlgorithm.NEGATIVE_AND_POSITIVE_ZERO_ARE_EQUAL &&
        a.isZero &&
        b.isZero
    ) {
        return true;
    }

    if (a.isInteger != b.isInteger) {
        return false;
    }
    if (a.isNegative != b.isNegative) {
        return false;
    }
    if (a.isZero != b.isZero) {
        return false;
    }
    if (!BigIntUtil.equal(a.fixedPointIntegerPartLength, b.fixedPointIntegerPartLength)) {
        return false;
    }
    if (!BigIntUtil.equal(a.fixedPointFractionalPartLength, b.fixedPointFractionalPartLength)) {
        return false;
    }
    if (!BigIntUtil.equal(a.fixedPointLength, b.fixedPointLength)) {
        return false;
    }
    return (
        a.getFixedPointString() ==
        b.getFixedPointString()
    );
}