import * as tape from "tape";
import * as tm from "../../../../../../../dist";

tape(__filename, t => {
    const f = tm.notUndefined(tm.orUndefined(tm.boolean()));

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
                    message : `x must not be undefined; received undefined`,
                    inputName : "x",
                    actualValue : undefined,
                    expected : "not undefined",
                }
            );
        } else {
            t.fail("Expected MappingError");
        }
    }

    t.end();
});