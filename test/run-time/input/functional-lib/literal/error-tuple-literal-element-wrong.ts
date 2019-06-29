import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.tupleLiteral(
        456,
    );

    try {
        f("x", [789]);
        t.fail("Expected to fail");
    } catch (err) {
        if (tm.ErrorUtil.isMappingError(err)) {
            t.deepEqual(
                {
                    message : err.message,
                    inputName : err.inputName,
                    actualValue : err.actualValue,
                    expected : err.expected,
                },
                {
                    message : `x[0] must be 456; received number`,
                    inputName : "x[0]",
                    actualValue : 789,
                    expected : "456",
                }
            );
        } else {
            t.fail("Expected mapping error");
        }
    }

    t.end();
});

tape(__filename, t => {
    const f = tm.tupleLiteral(
        456,
        789,
    );

    try {
        f("x", [456, 123]);
        t.fail("Expected to fail");
    } catch (err) {
        if (tm.ErrorUtil.isMappingError(err)) {
            t.deepEqual(
                {
                    message : err.message,
                    inputName : err.inputName,
                    actualValue : err.actualValue,
                    expected : err.expected,
                },
                {
                    message : `x[1] must be 789; received number`,
                    inputName : "x[1]",
                    actualValue : 123,
                    expected : "789",
                }
            );
        } else {
            t.fail("Expected mapping error");
        }
    }

    t.end();
});