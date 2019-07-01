import * as tape from "tape";
import * as tm from "../../../../../../../dist";

tape(__filename, t => {
    const f = tm.notMaybe(tm.orMaybe(tm.boolean()));

    try {
        f("x", null);
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
                    message : `x must not be undefined|null; received null`,
                    inputName : "x",
                    actualValue : null,
                    expected : "not undefined|null",
                }
            );
        } else {
            t.fail("Expected MappingError");
        }
    }

    try {
        f("x", undefined);
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
                    message : `x must not be undefined|null; received undefined`,
                    inputName : "x",
                    actualValue : undefined,
                    expected : "not undefined|null",
                }
            );
        } else {
            t.fail("Expected MappingError");
        }
    }

    t.end();
});