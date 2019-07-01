import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.length({
        min : 2,
        max : 5,
    });

    try {
        f("x", { length : "not-number" });
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
                    actualValue : { length : "not-number" },
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
                            message : "x.length must be number; received string",
                            inputName : "x.length",
                            actualValue : "not-number",
                            expected : "number",
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