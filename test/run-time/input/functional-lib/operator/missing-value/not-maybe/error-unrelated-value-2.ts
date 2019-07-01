import * as tape from "tape";
import * as tm from "../../../../../../../dist";

tape(__filename, t => {
    const f = tm.notMaybe(tm.or(tm.null(), tm.undefined(), tm.string(), tm.boolean()));

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
                    message : `x must be (string) or (boolean); received number`,
                    inputName : "x",
                    actualValue : 0,
                    expected : "(string) or (boolean)",
                }
            );

            if (err.unionErrors == undefined) {
                t.fail("Expected union errors");
            } else {
                if (err.unionErrors.length != 2) {
                    t.fail("Expected two unionErrors");
                } else {
                    t.deepEqual(
                        {
                            message : err.unionErrors[0].message,
                            inputName : err.unionErrors[0].inputName,
                            actualValue : err.unionErrors[0].actualValue,
                            expected : err.unionErrors[0].expected,
                        },
                        {
                            message : "x must be string; received number",
                            inputName : "x",
                            actualValue : 0,
                            expected : "string",
                        }
                    );
                    t.deepEqual(
                        {
                            message : err.unionErrors[1].message,
                            inputName : err.unionErrors[1].inputName,
                            actualValue : err.unionErrors[1].actualValue,
                            expected : err.unionErrors[1].expected,
                        },
                        {
                            message : "x must be boolean; received number",
                            inputName : "x",
                            actualValue : 0,
                            expected : "boolean",
                        }
                    );
                }
            }
        } else {
            t.fail("Expected MappingError");
        }
    }

    t.end();
});