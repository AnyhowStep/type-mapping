import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.jsonApi.serverDocument({
        data : tm.object({
            someId : tm.mysql.double().withExpectedInput<number>(),
        })
    });

    t.deepEqual(
        f.map("", {
            data : {
                someId : 3.141,
            },
        }),
        {
            data : {
                someId : 3.141,
            },
            included : undefined,
            errors : undefined,
            meta : undefined,
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
            included : undefined,
            errors : [],
            meta : undefined,
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
        } as any);
    })
    //data x-or errors required
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
        }),
        {
            data : {
                someId : 3.141,
            },
            included : [],
            errors : undefined,
            meta : undefined,
            jsonapi : undefined,
            links : undefined,
        }
    );

    t.throws(() => {
        f.map("", {
            //Should not be allowed at all
            meta : {

            }
        } as any);
    })

    //id expected of resource in server document
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
            errors : undefined,
            meta : undefined,
            jsonapi : undefined,
            links : undefined,
        }
    );
    //id expected of resource in server document
    t.throws(() => {
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
        } as any);
    })

    t.end();
});