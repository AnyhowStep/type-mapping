import * as tape from "tape";
import * as tm from "../../../../../dist";
import * as decimalJs from "decimal.js";

function test (t : tape.Test, str : string) {
    const parsedStr = tm.FixedPointUtil.tryParse(str);
    if (parsedStr == undefined) {
        t.throws(() => {
            new decimalJs.Decimal(str)
        }, str);
        return;
    }
    try {
        new decimalJs.Decimal(str)
    } catch (_err) {
        t.fail(`Should parse ${str}`);
        return;
    }
    const decimal = new decimalJs.Decimal(str);
    /**
     * + str -> FixedPointUtil.tryParse()
     * + str -> new Decimal() -> FixedPointUtil.tryParse()
     *
     * Then, we check if the output is the same.
     */
    const parsedDecimal = tm.FixedPointUtil.tryParse(decimal.toString());
    if (parsedDecimal == undefined) {
        t.fail(`Could not parse ${str} -> ${decimal.toString()}`);
        return;
    }

    t.true(
        tm.FixedPointUtil.isEqual(
            parsedStr,
            parsedDecimal,
            tm.FixedPointUtil.ZeroEqualityAlgorithm.NEGATIVE_AND_POSITIVE_ZERO_ARE_EQUAL
        ),
        str
    );
    t.deepEqual(
        parsedStr.getFixedPointString(),
        (
            parsedDecimal.isZero ?
            "-" + parsedDecimal.getFixedPointString() :
            parsedDecimal.getFixedPointString()
        ),
        str
    );
    t.deepEqual(
        parsedStr.isInteger,
        decimal.isInteger(),
        str
    );
    t.deepEqual(
        parsedStr.isNegative,
        decimal.isNegative(),
        str
    );
    t.deepEqual(
        parsedStr.isZero,
        decimal.isZero(),
        str
    );
}
function findAllPermutations (
    possiblePermutations : string[][],
    callback : (str : string) => void
) {
    let permutationIndex = 0;

    while (true) {
        let num = permutationIndex;
        let str : string[] = [];
        for (let i=possiblePermutations.length-1; i>=0; --i) {
            const arr = possiblePermutations[i];
            const arrIndex = num%arr.length;
            const ele = arr[arrIndex];
            str.push(ele);

            num = Math.floor(num / arr.length);
        }
        if (num != 0) {
            return;
        }
        callback(str.reverse().join(""));
        ++permutationIndex;
    }
}
tape(__filename, t => {
    const possiblePermutations = [
        ["-"],
        [
            "",
            "0",
            "1",

            "00",
            "01",
            "10",
            "11",

            "000",
            "001",
            "010",
            "011",

            "100",
            "101",
            "110",
            "111",
        ],
        ["", "."],
        [
            "",
            "0",
            "1",

            "00",
            "01",
            "10",
            "11",

            "000",
            "001",
            "010",
            "011",

            "100",
            "101",
            "110",
            "111",
        ],
        [
            "",
            "e",
            "E",

            "e+",
            "E+",

            "e-",
            "E-",
        ],
        [
            "",
            "0",
            "1",

            "00",
            "01",
            "10",
            "11",

            "000",
            "001",
            "010",
            "011",

            "100",
            "101",
            "110",
            "111",
        ],
    ];
    findAllPermutations(
        possiblePermutations,
        (str) => test(t, str)
    );

    t.end();
});