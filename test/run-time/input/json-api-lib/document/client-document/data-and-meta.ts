import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.jsonApi.clientDocument({
        data : tm.object({
            someId : tm.mysql.double().withExpectedInput<number>(),
        }),
        meta : tm.object({
            someId2 : tm.mysql.double().withExpectedInput<number>(),
        }),
    });

    t.deepEqual(
        f.map("", {
            data : {
                someId : 3.141,
            },
            meta : {
                someId2 : 3.141,
            },
        }),
        {
            data : {
                someId : 3.141,
            },
            meta : {
                someId2 : 3.141,
            },
            included: undefined,
            errors: undefined,
            jsonapi : undefined,
            links : undefined,
        }
    );
    t.deepEqual(
        f.map("", {
            //TODO Should empty arrays not be allowed?
            errors : [],
        }),
        {
            data : undefined,
            meta : undefined,
            errors : [],
            included: undefined,
            jsonapi : undefined,
            links : undefined,
        }
    );
    //Both cannot coexist
    t.throws(() => {
        f.map("", {
            data : {
                someId : 3.141,
            },
            errors : [],
            meta : {
                someId2 : 3.141,
            },
        } as any);
    })
    //(data and meta) x-or errors required
    t.throws(() => {
        f.map("", {
        } as any);
    })

    //included not allowed without data
    t.throws(() => {
        f.map("", {
            errors : [],
            included : [],
        } as any);
    })
    //Included allowed with data
    t.deepEqual(
        f.map("", {
            data : {
                someId : 3.141,
            },
            included : [],
            meta : {
                someId2 : 3.141,
            },
        }),
        {
            data : {
                someId : 3.141,
            },
            included : [],
            meta : {
                someId2 : 3.141,
            },
            errors : undefined,
            jsonapi : undefined,
            links : undefined,
        }
    );

    //Meta alone not allowed
    t.throws(() => {
        f.map("", {
            meta : {
                someId2 : 3.141,
            },
        } as any);
    })

    //Data alone not allowed
    t.throws(() => {
        f.map("", {
            data : {
                someId : 3.141,
            },
        } as any);
    })

    //id not expected of resource in client document
    t.deepEqual(
        f.map("", {
            data : {
                someId : 3.141,
            },
            included : [
                {
                    id : "id-required",
                    type : "type-required",
                }
            ],
            meta : {
                someId2 : 3.141,
            },
        }),
        {
            data : {
                someId : 3.141,
            },
            included : [
                {
                    id : "id-required",
                    type : "type-required",
                    attributes : undefined,
                    relationships : undefined,
                    links : undefined,
                    meta : undefined,
                }
            ],
            meta : {
                someId2 : 3.141,
            },
            errors : undefined,
            jsonapi : undefined,
            links : undefined,
        }
    );
    //id not expected of resource in client document
    t.deepEqual(
        f.map("", {
            data : {
                someId : 3.141,
            },
            included : [
                {
                    //id : "id-required",
                    type : "type-required",
                }
            ],
            meta : {
                someId2 : 3.141,
            },
        }),
        {
            data : {
                someId : 3.141,
            },
            included : [
                {
                    //id : "id-required",
                    id : undefined,
                    type : "type-required",
                    attributes : undefined,
                    relationships : undefined,
                    links : undefined,
                    meta : undefined,
                }
            ],
            meta : {
                someId2 : 3.141,
            },
            errors : undefined,
            jsonapi : undefined,
            links : undefined,
        }
    );

    t.end();
});