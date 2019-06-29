import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    const f = tm.jsonObjectString();

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
                    message : `x must be string; received number`,
                    inputName : "x",
                    actualValue : 123,
                    expected : "string",
                }
            );
        } else {
            t.fail("Expected mapping error");
        }
    }

    try {
        f("x", `1{ "field":123 }`);
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
                    message : `x must be JSON Object string`,
                    inputName : "x",
                    actualValue : `1{ "field":123 }`,
                    expected : "JSON Object string",
                }
            );
        } else {
            t.fail("Expected mapping error");
        }
    }

    try {
        f("x", `{ field:123 }`);
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
                    message : `x must be valid JSON Object string; Unexpected token f in JSON at position 2`,
                    inputName : "x",
                    actualValue : `{ field:123 }`,
                    expected : "valid JSON Object string",
                }
            );
        } else {
            t.fail("Expected mapping error");
        }
    }

    t.end();
});