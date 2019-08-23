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

    t.deepEqual(
        f("x", { type : "payout.created", data : "I am a payout.created event" }),
        { type : "payout.created", data : "I am a payout.created event" }
    );

    t.deepEqual(
        f("x", { type : "topup.created", data : "I am a topup.created event" }),
        { type : "topup.created", data : "I am a topup.created event" }
    );

    t.end();
});
