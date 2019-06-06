import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    enum E {
        A,
        B,
        C,
    }
    t.deepEqual(
        tm.EnumUtil.getValues(E),
        [0, 1, 2]
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
        tm.EnumUtil.getValues(E),
        ["X", "Y", "Z"]
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
        tm.EnumUtil.getValues(E),
        [3, 2, 1]
    );

    t.end();
});