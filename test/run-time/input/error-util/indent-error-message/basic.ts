import * as tape from "tape";
import * as tm from "../../../../../dist";

tape(__filename, t => {
    t.deepEqual(
        tm.ErrorUtil.indentErrorMessage("test"),
        "(\n\ttest\n)"
    );
    t.deepEqual(
        tm.ErrorUtil.indentErrorMessage("(\n\ttest\n)"),
        "(\n\t(\n\t\ttest\n\t)\n)"
    );

    t.end();
});