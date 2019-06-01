(global as any).BigInt = ((value : string|number|bigint) => {
    return {
        toString : () => {
            return String(value);
        },
    };
}) as any;
(BigInt as any).prototype = {
    valueOf : (mixed : unknown) => {
        return BigInt(mixed);
    },
};

import * as tape from "tape";
import * as tm from "../../dist";

tape(__filename, t => {
    t.false(tm.TypeUtil.isBigIntNativelySupported());
    t.end();
});