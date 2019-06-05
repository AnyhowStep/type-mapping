import * as tape from "tape";
import * as tm from "../../../../../../dist";

tape(__filename, (t) => {
    const f = tm.ipAddressString();

    t.deepEqual(f("x", `127.0.0.1`), `127.0.0.1`);
    t.deepEqual(f("x", `  127     . 0   . 0  . 1  `), `127.0.0.1`);
    t.deepEqual(f("x", `255.255.255.255`), `255.255.255.255`);
    t.deepEqual(f("x", `0.0.0.0`), `0.0.0.0`);

    t.false(tm.tryMap(f, "x", `0.0.0.-1`).success);
    t.false(tm.tryMap(f, "x", `0.0.0`).success);
    t.false(tm.tryMap(f, "x", `0.0.0.0.0`).success);

    t.deepEqual(f("x", "2001:db8:0:0:1:0:0:1"), "2001:db8::1:0:0:1");
    t.deepEqual(f("x", "2001:0db8:0:0:1:0:0:1"), "2001:db8::1:0:0:1");
    t.deepEqual(f("x", "2001:db8::1:0:0:1"), "2001:db8::1:0:0:1");
    t.deepEqual(f("x", "2001:db8::0:1:0:0:1"), "2001:db8::1:0:0:1");
    t.deepEqual(f("x", "2001:0db8::1:0:0:1"), "2001:db8::1:0:0:1");
    t.deepEqual(f("x", "2001:db8:0:0:1::1"), "2001:db8::1:0:0:1");
    t.deepEqual(f("x", "2001:db8:0000:0:1::1"), "2001:db8::1:0:0:1");
    t.deepEqual(f("x", "2001:DB8:0:0:1::1"), "2001:db8::1:0:0:1");

    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:0001"), "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1");
    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:001"), "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1");
    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:01"), "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1");
    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1"), "2001:db8:aaaa:bbbb:cccc:dddd:eeee:1");

    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd::1"), "2001:db8:aaaa:bbbb:cccc:dddd:0:1");
    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd:0:1"), "2001:db8:aaaa:bbbb:cccc:dddd:0:1");

    t.deepEqual(f("x", "2001:db8:0:0:0::1"), "2001:db8::1");
    t.deepEqual(f("x", "2001:db8:0:0::1"), "2001:db8::1");
    t.deepEqual(f("x", "2001:db8:0::1"), "2001:db8::1");
    t.deepEqual(f("x", "2001:db8::1"), "2001:db8::1");

    t.deepEqual(f("x", "2001:db8::aaaa:0:0:1"), "2001:db8::aaaa:0:0:1");
    t.deepEqual(f("x", "2001:db8:0:0:aaaa::1"), "2001:db8::aaaa:0:0:1");

    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa"), "2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa");
    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:AAAA"), "2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa");
    t.deepEqual(f("x", "2001:db8:aaaa:bbbb:cccc:dddd:eeee:AaAa"), "2001:db8:aaaa:bbbb:cccc:dddd:eeee:aaaa");

    t.deepEqual(f("x", "2001:0db8:0000:0000:1111:2222:3333:4444"), "2001:db8::1111:2222:3333:4444");

    t.deepEqual(f("x", "2001:db8::1"), "2001:db8::1");
    t.deepEqual(f("x", "2001:0db8:0000:0000:0000:0000:0000:0001"), "2001:db8::1");
    t.deepEqual(f("x", "2001:0db8:0::1"), "2001:db8::1");

    t.deepEqual(f("x", "2001:db8:0:0:1:0:0:1"), "2001:db8::1:0:0:1");
    t.deepEqual(f("x", "2001:DB8::1:0:0:1"), "2001:db8::1:0:0:1");

    t.deepEqual(f("x", "2001:db8:0:1::1"), "2001:db8:0:1::1");
    t.deepEqual(f("x", "2001:db8::1:0:0:0:1"), "2001:db8:0:1::1");

    t.deepEqual(f("x", "2001:db8::1:0:1"), "2001:db8::1:0:1");
    t.deepEqual(f("x", "2001:db8:1::0:1"), "2001:db8:1::1");

    t.deepEqual(f("x", "2001:0db8::0001"), "2001:db8::1");

    t.deepEqual(f("x", "2001:db8:0:0:0:0:2:1"), "2001:db8::2:1");
    t.deepEqual(f("x", "2001:db8::0:1"), "2001:db8::1");

    t.deepEqual(f("x", "2001:db8::1:1:1:1:1"), "2001:db8:0:1:1:1:1:1");

    t.deepEqual(f("x", "2001:0:0:1:0:0:0:1"), "2001:0:0:1::1");

    t.deepEqual(f("x", "2001:db8:0:0:1:0:0:1"), "2001:db8::1:0:0:1");

    t.deepEqual(f("x", "::ffff"), "::ffff");
    t.deepEqual(f("x", "::"), "::");
    t.deepEqual(f("x", "ffff::"), "ffff::");

    t.deepEqual(f("x", `127.0.0.1`), `127.0.0.1`);
    t.deepEqual(f("x", `  127     . 0   . 0  . 1  `), `127.0.0.1`);
    t.deepEqual(f("x", `255.255.255.255`), `255.255.255.255`);
    t.deepEqual(f("x", `0.0.0.0`), `0.0.0.0`);

    t.false(tm.tryMap(f, "x", `0.0.0.-1`).success);
    t.false(tm.tryMap(f, "x", `0.0.0`).success);
    t.false(tm.tryMap(f, "x", `0.0.0.0.0`).success);

    t.end();
});
