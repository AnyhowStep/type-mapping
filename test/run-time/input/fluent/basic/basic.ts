import * as tape from "tape";
import * as tm from "../../../../../fluent";

tape(__filename, t => {
    const fields = tm.fields({
        /** The x */
        x : tm.unsignedInteger(),
        /** The y */
        y : tm.unsignedInteger(),
        /** The z */
        z : tm.unsignedInteger(),
    });

    const f = tm.object(tm.TypeUtil.omit(fields, "z"));

    t.deepEqual(
        f("", { x : 1, y : 2, z : 3 }),
        { x : 1, y : 2 }
    );

    t.end();
});