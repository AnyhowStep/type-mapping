import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, t => {
    const f = tm.jsonApi.serverDocument({
        meta : tm.object({
            someId : tm.mysql.double().withExpectedInput<number>(),
        })
    });

    t.deepEqual(
        f.map("", {
            meta : {
                someId : 3.141,
            },
        }),
        {
            data : undefined,
            included : undefined,
            errors : undefined,
            meta : {
                someId : 3.141,
            },
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
    //Technically not disallowed by the spec; but disallowed by this implementation
    t.throws(() => {
        f.map("", {
            meta : {
                someId : 3.141,
            },
            errors : [],
        } as any);
    })
    //errors or meta required
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
    //Data not allowed
    t.throws(() => {
        f.map("", {
            data : {
                someId : 3.141,
            },
        } as any);
    })

    t.end();
});