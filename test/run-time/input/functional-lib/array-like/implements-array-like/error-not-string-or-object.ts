import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.implementsArrayLike();

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
                    message : `x must be (Object) or (string); received number`,
                    inputName : "x",
                    actualValue : 123,
                    expected : "(Object) or (string)",
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
                            message : "x must be instance of Object; received number",
                            inputName : "x",
                            actualValue : 123,
                            expected : "Object",
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
                            message : "x must be string; received number",
                            inputName : "x",
                            actualValue : 123,
                            expected : "string",
                        }
                    );
                }
            }

        } else {
            t.fail("Expected mapping error");
        }
    }

    t.end();
});