import * as FloatingPointUtil from "../floating-point-util";
import {getBigIntFactoryFunctionOrError} from "../type-util";
import * as BigIntUtil from "../bigint-util";
import {stringRepeat} from "../string-util";

function lazyInit<T> (initDelegate : () => T) : () => T {
    let initialized = false;
    let value : T|undefined = undefined;
    return () : T => {
        if (!initialized) {
            value = initDelegate();
            initialized = true;
        }
        return value!;
    };
}
export interface ParseResult {
    isInteger : boolean,
    isNegative: boolean,
    isZero: boolean,
    /**
     * Given `DECIMAL(precision, scale)`,
     * + precision = fixedPointFractionalLength + fixedPointIntegerLength
     * + scale     = fixedPointFractionalLength
     */
    fixedPointIntegerPartLength: bigint,
    fixedPointFractionalPartLength: bigint,
    /**
     * The length of the fixed-point string.
     */
    fixedPointLength: bigint,
    /**
     * These are methods because the string may be **very** long.
     * For example, expanding `1e999999999999999999999999999999`
     * into a fixed-point string
     * will probably just give you an out-of-memory exception.
     *
     * So, you should check the length of the string
     * before you get its string value!
     */
    getFixedPointIntegerPartString: () => string,
    getFixedPointFractionalPartString: () => string,
    getFixedPointString: () => string,
}
/**
 * @todo Make `getXxx()` functions cache results
 */
export function tryParse (str : string) : undefined|ParseResult {
    const parsed = FloatingPointUtil.tryParse(str);
    if (parsed == undefined) {
        return undefined;
    }
    const {
        isNegative,
        integerPart,
        isZero,
        exponentValue,
    } = FloatingPointUtil.toIntegerAndExponent(parsed);

    const BigInt = getBigIntFactoryFunctionOrError();

    if (isZero) {
        const fixedPointIntegerPartLength = BigInt(1);
        const fixedPointFractionalPartLength = BigInt(1);
        const fixedPointLength = BigIntUtil.addMany(
            (isNegative ? BigInt(1) : BigInt(0)),
            fixedPointIntegerPartLength,
            BigInt(1),
            fixedPointFractionalPartLength
        );
        const getFixedPointIntegerPartString = () => "0";
        const getFixedPointFractionalPartString = () => "0";
        const getFixedPointString = lazyInit(() => {
            const sign = isNegative ? "-" : "";
            return (
                sign +
                getFixedPointIntegerPartString() +
                "." +
                getFixedPointFractionalPartString()
            );
        });
        return {
            isInteger : true,
            isNegative,
            isZero,
            fixedPointIntegerPartLength,
            fixedPointFractionalPartLength,
            fixedPointLength,
            getFixedPointIntegerPartString,
            getFixedPointFractionalPartString,
            getFixedPointString,
        }
    }

    if (BigIntUtil.greaterThanOrEqual(exponentValue, 0)) {
        const fixedPointIntegerPartLength = BigIntUtil.add(BigInt(integerPart.length), exponentValue);
        const fixedPointFractionalPartLength = BigInt(1);
        const fixedPointLength = BigIntUtil.addMany(
            (isNegative ? BigInt(1) : BigInt(0)),
            fixedPointIntegerPartLength,
            BigInt(1),
            fixedPointFractionalPartLength
        );
        const getFixedPointIntegerPartString = lazyInit(() => (
            integerPart + stringRepeat("0", BigIntUtil.toNumber(exponentValue))
        ));
        const getFixedPointFractionalPartString = () => "0";
        const getFixedPointString = lazyInit(() => {
            const sign = isNegative ? "-" : "";
            return (
                sign +
                getFixedPointIntegerPartString() +
                "." +
                getFixedPointFractionalPartString()
            );
        });
        return {
            isInteger : true,
            isNegative,
            isZero,
            fixedPointIntegerPartLength,
            fixedPointFractionalPartLength,
            fixedPointLength,
            getFixedPointIntegerPartString,
            getFixedPointFractionalPartString,
            getFixedPointString,
        }
    } else {
        const fractionalOffset = BigIntUtil.mul(exponentValue, -1);
        if (BigIntUtil.lessThan(fractionalOffset, integerPart.length)) {
            const newIntegerPart = integerPart.substring(
                0,
                integerPart.length - BigIntUtil.toNumber(fractionalOffset)
            );
            let newFractionalPart = integerPart.substring(
                integerPart.length - BigIntUtil.toNumber(fractionalOffset),
                integerPart.length
            ).replace(/(0+)$/, "");
            if (newFractionalPart == "") {
                newFractionalPart = "0";
            }

            const fixedPointIntegerPartLength = BigInt(newIntegerPart.length);
            const fixedPointFractionalPartLength = BigInt(newFractionalPart.length);
            const fixedPointLength = BigIntUtil.addMany(
                (isNegative ? BigInt(1) : BigInt(0)),
                fixedPointIntegerPartLength,
                BigInt(1),
                fixedPointFractionalPartLength
            );
            const getFixedPointIntegerPartString = () => newIntegerPart;
            const getFixedPointFractionalPartString = () => newFractionalPart;
            const getFixedPointString = lazyInit(() => {
                const sign = isNegative ? "-" : "";
                return (
                    sign +
                    getFixedPointIntegerPartString() +
                    "." +
                    getFixedPointFractionalPartString()
                );
            });
            return {
                isInteger : (newFractionalPart == "0"),
                isNegative,
                isZero,
                fixedPointIntegerPartLength,
                fixedPointFractionalPartLength,
                fixedPointLength,
                getFixedPointIntegerPartString,
                getFixedPointFractionalPartString,
                getFixedPointString,
            }
        } else if (BigIntUtil.equal(fractionalOffset, BigInt(integerPart.length))) {
            let newFractionalPart = integerPart.replace(/(0+)$/, "");
            if (newFractionalPart == "") {
                newFractionalPart = "0";
            }

            const fixedPointIntegerPartLength = BigInt(1);
            const fixedPointFractionalPartLength = BigInt(newFractionalPart.length);
            const fixedPointLength = BigIntUtil.addMany(
                (isNegative ? BigInt(1) : BigInt(0)),
                fixedPointIntegerPartLength,
                BigInt(1),
                fixedPointFractionalPartLength
            );
            const getFixedPointIntegerPartString = () => (
                "0"
            );
            const getFixedPointFractionalPartString = () => newFractionalPart;
            const getFixedPointString = lazyInit(() => {
                const sign = isNegative ? "-" : "";
                return (
                    sign +
                    getFixedPointIntegerPartString() +
                    "." +
                    getFixedPointFractionalPartString()
                );
            });
            return {
                isInteger : (newFractionalPart == "0"),
                isNegative,
                isZero,
                fixedPointIntegerPartLength,
                fixedPointFractionalPartLength,
                fixedPointLength,
                getFixedPointIntegerPartString,
                getFixedPointFractionalPartString,
                getFixedPointString,
            }
        } else {
            let leadingZeroCount = BigIntUtil.sub(fractionalOffset, BigInt(integerPart.length));
            let newFractionalPart = integerPart.replace(/(0+)$/, "");
            if (newFractionalPart == "") {
                leadingZeroCount = BigInt(0);
                newFractionalPart = "0";
            }

            const fixedPointIntegerPartLength = BigInt(1);
            const fixedPointFractionalPartLength = BigIntUtil.add(leadingZeroCount, BigInt(newFractionalPart.length));
            const fixedPointLength = BigIntUtil.addMany(
                (isNegative ? BigInt(1) : BigInt(0)),
                fixedPointIntegerPartLength,
                BigInt(1),
                fixedPointFractionalPartLength
            );
            const getFixedPointIntegerPartString = () => (
                "0"
            );
            const getFixedPointFractionalPartString = lazyInit(() => (
                stringRepeat("0", BigIntUtil.toNumber(leadingZeroCount)) +
                newFractionalPart
            ));
            const getFixedPointString = lazyInit(() => {
                const sign = isNegative ? "-" : "";
                return (
                    sign +
                    getFixedPointIntegerPartString() +
                    "." +
                    getFixedPointFractionalPartString()
                );
            });
            return {
                isInteger : (newFractionalPart == "0"),
                isNegative,
                isZero,
                fixedPointIntegerPartLength,
                fixedPointFractionalPartLength,
                fixedPointLength,
                getFixedPointIntegerPartString,
                getFixedPointFractionalPartString,
                getFixedPointString,
            }
        }
    }
}