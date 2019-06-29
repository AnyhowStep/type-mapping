import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.tupleLiteral(
        456,
    );

    try {
        f("x", 123);
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
                    message : `x must be instance of Array; received number`,
                    inputName : "x",
                    actualValue : 123,
                    expected : "array",
                }
            );
        } else {
            t.fail("Expected mapping error");
        }
    }

    t.end();
});