import * as tm from "../../../../../../dist";

export const f = tm.jsonApi.clientDocument({
    data : tm.object({
        someId : tm.mysql.bigIntUnsigned().withExpectedInput<string|bigint>(),
    })
});

export const output_0 = f.map("", {
    data : {
        someId : BigInt(2),
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
});
//data x-or errors required
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
});

f.map("", {
    //Should not be allowed at all
    meta : {

    }
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
});