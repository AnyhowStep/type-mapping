import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.renameMap({
        x : tm.withName(tm.string(), "y"),
        a : tm.withName(tm.toTrimmed(), "y"),
    });

    const result = tm.tryMapHandled(f, "x", {
        x : " hello ",
        a : " hello ",
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
                message : `x is invalid; Cannot merge string and string; they are not equal`,
                inputName : "x",
                actualValue : {
                    y : "hello",
                },
                expected : `{ "y" : string }`,
            }
        );
        const propertyErrors = result.mappingError.propertyErrors;
        if (propertyErrors == undefined) {
            t.fail("Expected propertyErrors");
        } else if (propertyErrors.length != 1) {
            t.fail("Expected one propertyErrors");
        } else {
            t.deepEqual(
                {
                    message : propertyErrors[0].message,
                    inputName : propertyErrors[0].inputName,
                    actualValue : propertyErrors[0].actualValue,
                    expected : propertyErrors[0].expected,
                },
                {
                    message : "Cannot merge string and string; they are not equal",
                    inputName : "x.y",
                    actualValue : "hello",
                    expected : "string",
                }
            );
        }
    }

    t.end();
});
