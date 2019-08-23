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

    const output = tm.tryMap(f, "x", 1 as any);
    if (output.success) {
        t.fail("Should fail");
    } else {
        t.deepEqual(
            output.mappingError.message,
            `x must be (Object); received number`
        );
        t.deepEqual(
            output.mappingError.inputName,
            "x"
        );
        t.deepEqual(
            output.mappingError.actualValue,
            1
        );
        t.deepEqual(
            output.mappingError.expected,
            `(Object)`
        );

        t.deepEqual(output.mappingError.propertyErrors, undefined);

        const unionErrors = output.mappingError.unionErrors;
        if (unionErrors == undefined || unionErrors.length != 2) {
            t.fail("Expected unionErrors");
        } else {
            t.deepEqual(
                unionErrors.map(err => err.message),
                [
                    `x must be instance of Object; received number`,
                    `x must be instance of Object; received number`,
                ]
            );
            t.deepEqual(
                unionErrors.map(err => err.inputName),
                [
                    "x",
                    "x"
                ]
            );
            t.deepEqual(
                unionErrors.map(err => err.actualValue),
                [
                    1,
                    1,
                ]
            );
            t.deepEqual(
                unionErrors.map(err => err.expected),
                [
                    `Object`,
                    `Object`,
                ]
            );
        }
    }

    t.end();
});
