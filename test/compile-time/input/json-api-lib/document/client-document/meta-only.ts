import * as tm from "../../../../../../dist";

export const f = tm.jsonApi.clientDocument({
    meta : tm.object({
        someId : tm.mysql.bigIntUnsigned().withExpectedInput<string|bigint>(),
    })
});

export const output_0 = f.map("", {
    meta : {
        someId : BigInt(2),
    },
});
f.map("", {
    //TODO Should empty arrays not be allowed?
    errors : [],
});
//Technically not disallowed by the spec; but disallowed by this implementation
f.map("", {
    meta : {
        someId : BigInt(2),
    },
    errors : [],
});
//errors or meta required
f.map("", {
});

//included not allowed without data
f.map("", {
    errors : [],
    included : [],
});
//Data not allowed
f.map("", {
    data : {
        someId : BigInt(2),
    },
});