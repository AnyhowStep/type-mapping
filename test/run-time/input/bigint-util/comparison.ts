import * as tape from "tape";
import * as tm from "../../../../dist";

tape(__filename, t => {
    for (let i=-10; i<10; ++i) {
        for (let j=-10; j<10; ++j) {
            t.deepEqual(
                tm.BigIntUtil.greaterThan(BigInt(i), BigInt(j)),
                i > j
            );
            t.deepEqual(
                tm.BigIntUtil.greaterThanOrEqual(BigInt(i), BigInt(j)),
                i >= j
            );
            t.deepEqual(
                tm.BigIntUtil.lessThan(BigInt(i), BigInt(j)),
                i < j
            );
            t.deepEqual(
                tm.BigIntUtil.lessThanOrEqual(BigInt(i), BigInt(j)),
                i <= j
            );
            t.deepEqual(
                tm.BigIntUtil.equal(BigInt(i), BigInt(j)),
                i == j
            );
        }
    }

    t.end();
});