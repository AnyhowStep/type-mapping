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

    const output = tm.tryMap(f, "x", { type : "unknown" } as any);
    if (output.success) {
        t.fail("Should fail");
    } else {
        t.deepEqual(
            output.mappingError.message,
            `x must be object with "payout.created"|"topup.created" property "type"`
        );
        t.deepEqual(
            output.mappingError.inputName,
            "x"
        );
        t.deepEqual(
            output.mappingError.actualValue,
            { type : "unknown" }
        );
        t.deepEqual(
            output.mappingError.expected,
            `object with "payout.created"|"topup.created" property "type"`
        );

        if (output.mappingError.propertyErrors == undefined || output.mappingError.propertyErrors.length != 1) {
            t.fail("Expected output.mappingError.propertyErrors");
        } else {
            const propertyError = output.mappingError.propertyErrors[0];

            t.deepEqual(
                propertyError.message,
                `x.type must be ("payout.created") or ("topup.created"); received string`
            );
            t.deepEqual(
                propertyError.inputName,
                `x.type`
            );
            t.deepEqual(
                propertyError.actualValue,
                "unknown"
            );
            t.deepEqual(
                propertyError.expected,
                `("payout.created") or ("topup.created")`
            );

            const unionErrors = propertyError.unionErrors;
            if (unionErrors == undefined) {
                t.fail("Expected propertyError.unionErrors");
            } else {
                t.deepEqual(
                    unionErrors.map(err => err.message),
                    [
                        `x.type must be "payout.created"; received string`,
                        `x.type must be "topup.created"; received string`,
                    ]
                );
                t.deepEqual(
                    unionErrors.map(err => err.inputName),
                    [
                        "x.type",
                        "x.type"
                    ]
                );
                t.deepEqual(
                    unionErrors.map(err => err.actualValue),
                    [
                        "unknown",
                        "unknown",
                    ]
                );
                t.deepEqual(
                    unionErrors.map(err => err.expected),
                    [
                        `"payout.created"`,
                        `"topup.created"`,
                    ]
                );
            }
        }
    }

    t.end();
});
