import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, (t) => {
    const f = tm.ipV4MappedIpV6String();

    t.deepEqual(f("x", "::ffff:192.0.2.128"), "::ffff:192.0.2.128");
    t.deepEqual(f("x", "::192.0.2.128"), "::192.0.2.128");
    t.deepEqual(f("x", "ffff::192.0.2.128"), "ffff::192.0.2.128");

    t.deepEqual(f("x", "0:0:0:0:0:ffff:192.0.2.1"), "::ffff:192.0.2.1");

    t.deepEqual(f("x", "1:1:1:0::127.0.0.1"), "1:1:1::127.0.0.1");
    t.deepEqual(f("x", "1:1:1::127.0.0.1"), "1:1:1::127.0.0.1");
    t.deepEqual(f("x", "1:1:1:1::127.0.0.1"), "1:1:1:1::127.0.0.1");
    t.deepEqual(f("x", "1:1:1:1:1::127.0.0.1"), "1:1:1:1:1:0:127.0.0.1");
    t.false(tm.tryMap(f, "x", "1:1:1:1:1:1::127.0.0.1").success);
    t.false(tm.tryMap(f, "x", "1:1:1:1:1:0::127.0.0.1").success);
    t.false(tm.tryMap(f, "x", "1:1:1:1:1:1:1:127.0.0.1").success);
    t.deepEqual(f("x", "1:1:1:1:1:1:127.0.0.1"), "1:1:1:1:1:1:127.0.0.1");

    t.deepEqual(f("x", "1:1:1:1::1:127.0.0.2"), "1:1:1:1:0:1:127.0.0.2");

    t.end();
});