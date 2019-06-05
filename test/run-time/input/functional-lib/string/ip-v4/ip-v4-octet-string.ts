import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, (t) => {
    const f = tm.ipV4OctetString();
    for (let i=0; i<=255; ++i) {
        //Normal cases
        t.deepEqual(f("x", i), i.toString());
        t.deepEqual(f("x", i.toString()), i.toString());
        //Weird case
        t.deepEqual(f("x", ` 0${i} `), i.toString());
    }
    for (let i=256; i<260; ++i) {
        t.false(tm.tryMap(f, "x", i as any).success);
        t.false(tm.tryMap(f, "x", i.toString()).success);
        t.false(tm.tryMap(f, "x", ` 0${i} `).success);
    }
    for (let i=-10; i<0; ++i) {
        t.false(tm.tryMap(f, "x", i as any).success);
        t.false(tm.tryMap(f, "x", i.toString()).success);
        t.false(tm.tryMap(f, "x", ` ${i} `).success);
    }

    t.end();
});
