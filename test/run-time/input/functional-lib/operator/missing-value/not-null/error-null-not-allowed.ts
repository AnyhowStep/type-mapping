import * as tape from "tape";
import * as tm from "../../../../../../../dist";

tape(__filename, t => {
    const f = tm.notNull(tm.orNull(tm.boolean()));

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
                    message : `x must not be null; received null`,
                    inputName : "x",
                    actualValue : null,
                    expected : "not null",
                }
            );
        } else {
            t.fail("Expected MappingError");
        }
    }

    t.end();
});