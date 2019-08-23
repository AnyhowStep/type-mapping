import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.discriminatedUnion(
        "type",
        tm.object({
            type : tm.literal("payout.created"),
            data : tm.literal("I am a payout.created event"),
        }),
        tm.object({
            type : tm.literal("topup.created"),
            data : tm.literal("I am a topup.created event"),
        }),
    );

    const output = tm.tryMap(f, "x", { type : "payout.created", data : "blah" } as any);
    if (output.success) {
        t.fail("Should fail");
    } else {

        t.deepEqual(
            output.mappingError.message,
            `x must be (valid object); received Object`
        );
        t.deepEqual(
            output.mappingError.inputName,
            "x"
        );
        t.deepEqual(
            output.mappingError.actualValue,
            { type : "payout.created", data : "blah" }
        );
        t.deepEqual(
            output.mappingError.expected,
            `(valid object)`
        );

        const unionErrors = output.mappingError.unionErrors;
        if (unionErrors == undefined || unionErrors.length != 1) {
            console.log(unionErrors)
            t.fail("Expected unionErrors");
        } else {
            const unionError = unionErrors[0];
            t.deepEqual(
                unionError.message,
                `x must be valid object`
            );
            t.deepEqual(
                unionError.inputName,
                `x`
            );
            t.deepEqual(
                unionError.actualValue,
                { type : "payout.created", data : "blah" }
            );
            t.deepEqual(
                unionError.expected,
                `valid object`
            );

            const propertyErrors = unionError.propertyErrors;
            if (propertyErrors == undefined || propertyErrors.length != 1) {
                t.fail("Expected propertyErrors");
            } else {
                const propertyError = propertyErrors[0];
                t.deepEqual(
                    propertyError.message,
                    `x.data must be "I am a payout.created event"; received string`
                );
                t.deepEqual(
                    propertyError.inputName,
                    `x.data`
                );
                t.deepEqual(
                    propertyError.actualValue,
                    "blah"
                );
                t.deepEqual(
                    propertyError.expected,
                    `"I am a payout.created event"`
                );
            }
        }
    }

    t.end();
});
