import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.deriveMap({
        x : tm.withName(tm.string(), "y"),
        a : tm.withName(tm.string(), "b"),
    });

    const result = tm.tryMapHandled(f, "x", {
        x : 1,
        a : 2,
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
                message : `x is invalid.
+ (
\tx must be object with string property "x"
)
+ (
\tx must be object with string property "a"
)`,
                inputName : "x",
                actualValue : {
                    x : 1,
                    a : 2,
                },
                expected : `(object with string property "x") and (object with string property "a")`,
            }
        );
        const intersectionErrors = result.mappingError.intersectionErrors;
        if (intersectionErrors == undefined) {
            t.fail("Expected intersectionErrors");
        } else {
            if (intersectionErrors.length != 2) {
                t.fail("Expected two intersectionErrors");
            } else {
                {
                    t.deepEqual(
                        {
                            message : intersectionErrors[0].message,
                            inputName : intersectionErrors[0].inputName,
                            actualValue : intersectionErrors[0].actualValue,
                            expected : intersectionErrors[0].expected,
                        },
                        {
                            message : `x must be object with string property "x"`,
                            inputName : "x",
                            actualValue : { x : 1, a : 2 },
                            expected : `object with string property "x"`,
                        }
                    );
                    const propertyErrors = intersectionErrors[0].propertyErrors;
                    if (propertyErrors == undefined) {
                        t.fail("Expected propertyErrors");
                    } else if (propertyErrors.length != 1) {
                        t.fail("Expected two propertyErrors");
                    } else {
                        t.deepEqual(
                            {
                                message : propertyErrors[0].message,
                                inputName : propertyErrors[0].inputName,
                                actualValue : propertyErrors[0].actualValue,
                                expected : propertyErrors[0].expected,
                            },
                            {
                                message : "x.x must be string; received number",
                                inputName : "x.x",
                                actualValue : 1,
                                expected : "string",
                            }
                        );
                    }
                }
                {
                    t.deepEqual(
                        {
                            message : intersectionErrors[1].message,
                            inputName : intersectionErrors[1].inputName,
                            actualValue : intersectionErrors[1].actualValue,
                            expected : intersectionErrors[1].expected,
                        },
                        {
                            message : `x must be object with string property "a"`,
                            inputName : "x",
                            actualValue : { x : 1, a : 2 },
                            expected : `object with string property "a"`,
                        }
                    );
                    const propertyErrors = intersectionErrors[1].propertyErrors;
                    if (propertyErrors == undefined) {
                        t.fail("Expected propertyErrors");
                    } else if (propertyErrors.length != 1) {
                        t.fail("Expected two propertyErrors");
                    } else {
                        t.deepEqual(
                            {
                                message : propertyErrors[0].message,
                                inputName : propertyErrors[0].inputName,
                                actualValue : propertyErrors[0].actualValue,
                                expected : propertyErrors[0].expected,
                            },
                            {
                                message : "x.a must be string; received number",
                                inputName : "x.a",
                                actualValue : 2,
                                expected : "string",
                            }
                        );
                    }
                }
            }
        }
    }

    t.end();
});
