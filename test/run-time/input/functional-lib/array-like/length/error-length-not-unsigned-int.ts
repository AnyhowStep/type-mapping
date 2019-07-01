import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.length({
        min : 2,
        max : 5,
    });

    try {
        f("x", { length : 3.141 });
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
                    message : `x must be value of length between 2 and 5`,
                    inputName : "x",
                    actualValue : { length : 3.141 },
                    expected : "value of length between 2 and 5",
                }
            );

            if (err.propertyErrors == undefined) {
                t.fail("Expected propertyErrors");
            } else {
                if (err.propertyErrors.length != 1) {
                    t.fail("Expected one propertyErrors");
                } else {
                    t.deepEqual(
                        {
                            message : err.propertyErrors[0].message,
                            inputName : err.propertyErrors[0].inputName,
                            actualValue : err.propertyErrors[0].actualValue,
                            expected : err.propertyErrors[0].expected,
                        },
                        {
                            message : "x.length must be integer; received double",
                            inputName : "x.length",
                            actualValue : 3.141,
                            expected : "integer",
                        }
                    );
                }
            }

        } else {
            t.fail("Expected mapping error");
        }
    }

    try {
        f("x", { length : -1 });
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
                    message : `x must be value of length between 2 and 5`,
                    inputName : "x",
                    actualValue : { length : -1 },
                    expected : "value of length between 2 and 5",
                }
            );

            if (err.propertyErrors == undefined) {
                t.fail("Expected propertyErrors");
            } else {
                if (err.propertyErrors.length != 1) {
                    t.fail("Expected one propertyErrors");
                } else {
                    t.deepEqual(
                        {
                            message : err.propertyErrors[0].message,
                            inputName : err.propertyErrors[0].inputName,
                            actualValue : err.propertyErrors[0].actualValue,
                            expected : err.propertyErrors[0].expected,
                        },
                        {
                            message : "x.length must be greater than, or equal to 0",
                            inputName : "x.length",
                            actualValue : -1,
                            expected : "greater than, or equal to 0",
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