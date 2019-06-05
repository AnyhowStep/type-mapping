import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, (t) => {
    const f = tm.ipV4String();

    t.deepEqual(f("x", `127.0.0.1`), `127.0.0.1`);
    t.deepEqual(f("x", `  127     . 0   . 0  . 1  `), `127.0.0.1`);
    t.deepEqual(f("x", `255.255.255.255`), `255.255.255.255`);
    t.deepEqual(f("x", `0.0.0.0`), `0.0.0.0`);

    t.false(tm.tryMap(f, "x", `0.0.0.-1`).success);
    t.false(tm.tryMap(f, "x", `0.0.0`).success);
    t.false(tm.tryMap(f, "x", `0.0.0.0.0`).success);

    t.end();
});
