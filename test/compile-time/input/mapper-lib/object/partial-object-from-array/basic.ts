import * as tm from "../../../../../../dist";

export const a = tm.partialObjectFromArray(
    tm.withName(tm.unsignedInteger(), "foo"),
    tm.withName(tm.string(), "foo")
);
export const b = tm.partialObjectFromArray(
    tm.withName(
        tm.or(
            tm.unsignedInteger(),
            tm.string()
        ),
        "foo"
    )
);

export const c : typeof a = b;
export const d : typeof b = a;