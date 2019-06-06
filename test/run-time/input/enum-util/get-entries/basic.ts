import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    enum E {
        A,
        B,
        C,
    }
    t.deepEqual(
        tm.EnumUtil.getEntries(E),
        [
            { key : "A", value : 0 },
            { key : "B", value : 1 },
            { key : "C", value : 2 },
        ]
    );

    t.end();
});

tape(__filename, t => {
    enum E {
        A = "X",
        B = "Y",
        C = "Z",
    }
    t.deepEqual(
        tm.EnumUtil.getEntries(E),
        [
            { key : "A", value : "X" },
            { key : "B", value : "Y" },
            { key : "C", value : "Z" },
        ]
    );

    t.end();
});

tape(__filename, t => {
    enum E {
        A = 3,
        B = 2,
        C = 1,
    }
    t.deepEqual(
        tm.EnumUtil.getEntries(E),
        [
            { key : "A", value : 3 },
            { key : "B", value : 2 },
            { key : "C", value : 1 },
        ]
    );

    t.end();
});