import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.objectFromMap({
        x : tm.string(),
        y : tm.unsafeNumber(),
        z : tm.string(),
    });

    const result = tm.tryMapHandled(f, "x", {
        x : "str",
        y : "not-a-number",
        z : 123,
    });

    if (result.success) {
        t.fail("Expected to fail");
    } else {
        t.deepEqual(
            {
                message : result.mappingError.message,
                inputName : result.mappingError.inputName,
                actualValue : result.mappingError.actualValue,
                expected : result.mappingError.expected,
            },
            {
                message : `x must be valid object`,
                inputName : "x",
                actualValue : {
                    x : "str",
                    y : "not-a-number",
                    z : 123,
                },
                expected : "valid object",
            }
        );
        if (result.mappingError.propertyErrors == undefined) {
            t.fail("Expected propertyErrors");
        } else {
            t.deepEqual(result.mappingError.propertyErrors.length, 2);
            t.deepEqual(
                {
                    message : result.mappingError.propertyErrors[0].message,
                    inputName : result.mappingError.propertyErrors[0].inputName,
                    actualValue : result.mappingError.propertyErrors[0].actualValue,
                    expected : result.mappingError.propertyErrors[0].expected,
                },
                {
                    message : `x.y must be number; received string`,
                    inputName : "x.y",
                    actualValue : "not-a-number",
                    expected : "number",
                }
            );
            t.deepEqual(
                {
                    message : result.mappingError.propertyErrors[1].message,
                    inputName : result.mappingError.propertyErrors[1].inputName,
                    actualValue : result.mappingError.propertyErrors[1].actualValue,
                    expected : result.mappingError.propertyErrors[1].expected,
                },
                {
                    message : `x.z must be string; received number`,
                    inputName : "x.z",
                    actualValue : 123,
                    expected : "string",
                }
            );
        }
    }

    t.end();
});
