import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.tupleLiteral(
        456,
    );

    try {
        f("x", [456, 789]);
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
                    message : `x must be value of length 1`,
                    inputName : "x",
                    actualValue : [456, 789],
                    expected : "value of length 1",
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
                            message : "x.length must be 1; received number",
                            inputName : "x.length",
                            actualValue : 2,
                            expected : "1",
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