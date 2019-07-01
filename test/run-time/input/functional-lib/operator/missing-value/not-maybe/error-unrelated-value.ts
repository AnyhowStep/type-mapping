import * as tape from "tape";
import * as tm from "../../../../../../../dist";

tape(__filename, t => {
    const f = tm.notMaybe(tm.orMaybe(tm.boolean()));

    try {
        f("x", 0);
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
                    message : `x must be boolean; received number`,
                    inputName : "x",
                    actualValue : 0,
                    expected : "boolean",
                }
            );
            t.deepEqual(err.unionErrors, undefined);
        } else {
            t.fail("Expected MappingError");
        }
    }

    t.end();
});