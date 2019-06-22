import * as tm from "../../../../../../dist";

export const f = tm.jsonApi.clientDocument({
    data : tm.object({
        someId : tm.mysql.bigIntUnsigned().withExpectedInput<string|bigint>(),
    }),
    meta : tm.object({
        someId2 : tm.mysql.bigIntUnsigned().withExpectedInput<string|bigint>(),
    }),
});

export const output_0 = f.map("", {
    data : {
        someId : BigInt(2),
    },
    meta : {
        someId2 : BigInt(2),
    },
});
f.map("", {
    //TODO Should empty arrays not be allowed?
    errors : [],
});
//Both cannot coexist
f.map("", {
    data : {
        someId : BigInt(2),
    },
    errors : [],
    meta : {
        someId2 : BigInt(2),
    },
});
//(data and meta) x-or errors required
f.map("", {
});

//included not allowed without data
f.map("", {
    errors : [],
    included : [],
});
//Included allowed with data
f.map("", {
    data : {
        someId : BigInt(2),
    },
    included : [],
    meta : {
        someId2 : BigInt(2),
    },
});

//Meta alone not allowed
f.map("", {
    meta : {
        someId2 : BigInt(2),
    },
});

//Data alone not allowed
f.map("", {
    data : {
        someId : BigInt(2),
    },
});

//id not expected of resource in client document
f.map("", {
    data : {
        someId : BigInt(2),
    },
    included : [
        {
            id : "id-required",
            type : "type-required",
        }
    ],
    meta : {
        someId2 : BigInt(2),
    },
});
//id not expected of resource in client document
f.map("", {
    data : {
        someId : BigInt(2),
    },
    included : [
        {
            //id : "id-required",
            type : "type-required",
        }
    ],
    meta : {
        someId2 : BigInt(2),
    },
});