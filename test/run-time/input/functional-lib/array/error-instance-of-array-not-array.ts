import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.instanceOfArray();

    try {
        f("x", "not-an-array");
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
                    message : `x must be instance of Array; received string`,
                    inputName : "x",
                    actualValue : "not-an-array",
                    expected : "array",
                }
            );
        } else {
            t.fail("Expected mapping error");
        }
    }

    t.end();
});