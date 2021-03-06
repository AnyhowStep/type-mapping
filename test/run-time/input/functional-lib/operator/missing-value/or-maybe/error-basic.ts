import * as tape from "tape";
import * as tm from "../../../../../../../dist";

tape(__filename, t => {
    const f = tm.orMaybe(tm.boolean());

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
                    message : `x must be (boolean) or (undefined) or (null); received number`,
                    inputName : "x",
                    actualValue : 0,
                    expected : "(boolean) or (undefined) or (null)",
                }
            );

            if (err.unionErrors == undefined) {
                t.fail("Expected union errors");
            } else {
                if (err.unionErrors.length != 3) {
                    t.fail("Expected three unionErrors");
                } else {
                    t.deepEqual(
                        {
                            message : err.unionErrors[0].message,
                            inputName : err.unionErrors[0].inputName,
                            actualValue : err.unionErrors[0].actualValue,
                            expected : err.unionErrors[0].expected,
                        },
                        {
                            message : "x must be boolean; received number",
                            inputName : "x",
                            actualValue : 0,
                            expected : "boolean",
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
                            message : "x must be undefined; received number",
                            inputName : "x",
                            actualValue : 0,
                            expected : "undefined",
                        }
                    );
                    t.deepEqual(
                        {
                            message : err.unionErrors[2].message,
                            inputName : err.unionErrors[2].inputName,
                            actualValue : err.unionErrors[2].actualValue,
                            expected : err.unionErrors[2].expected,
                        },
                        {
                            message : "x must be null; received number",
                            inputName : "x",
                            actualValue : 0,
                            expected : "null",
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