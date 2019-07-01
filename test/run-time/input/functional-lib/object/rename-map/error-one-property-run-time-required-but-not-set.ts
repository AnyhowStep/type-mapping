import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.renameMap({
        x : tm.runTimeRequired(tm.withName(tm.string(), "y")),
    });

    const result = tm.tryMapHandled(f, "x", {
        //x : 1,
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
                message : `x must be object with explicitly set property "y"`,
                inputName : "x",
                actualValue : {
                    //x : 1,
                },
                expected : `object with explicitly set property "y"`,
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
                    message : `x.y must be explicitly set`,
                    inputName : "x.y",
                    actualValue : undefined,
                    expected : "explicitly set",
                }
            );
        }
    }

    t.end();
});
