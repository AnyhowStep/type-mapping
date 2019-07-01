import * as tape from "tape";
import * as tm from "../../../../../../../dist";

tape(__filename, t => {
    const f = tm.notNull(tm.orNull(tm.mysql.bigIntUnsigned()));

    try {
        f("x", true);
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
                    message : `x must be (bigint) or (string) or (number); received boolean`,
                    inputName : "x",
                    actualValue : true,
                    expected : "(bigint) or (string) or (number)",
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
                            message : "x must be bigint; received boolean",
                            inputName : "x",
                            actualValue : true,
                            expected : "bigint",
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
                            message : "x must be string; received boolean",
                            inputName : "x",
                            actualValue : true,
                            expected : "string",
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
                            message : "x must be number; received boolean",
                            inputName : "x",
                            actualValue : true,
                            expected : "number",
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