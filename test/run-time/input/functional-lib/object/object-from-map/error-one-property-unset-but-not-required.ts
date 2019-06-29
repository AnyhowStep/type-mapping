import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.objectFromMap({
        x : tm.string(),
    });

    const result = tm.tryMapHandled(f, "x", {

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
                },
                expected : "valid object",
            }
        );
        if (result.mappingError.propertyErrors == undefined) {
            t.fail("Expected propertyErrors");
        } else {
            t.deepEqual(result.mappingError.propertyErrors.length, 1);
            t.deepEqual(
                {
                    message : result.mappingError.propertyErrors[0].message,
                    inputName : result.mappingError.propertyErrors[0].inputName,
                    actualValue : result.mappingError.propertyErrors[0].actualValue,
                    expected : result.mappingError.propertyErrors[0].expected,
                },
                {
                    message : `x.x must be string; received undefined`,
                    inputName : "x.x",
                    actualValue : undefined,
                    expected : "string",
                }
            );
        }
    }

    t.end();
});
