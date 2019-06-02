import * as tape from "tape";
import * as tm from "../../../../dist";

tape(__filename, t => {
    t.true(tm.TypeUtil.isPojo({}));
    t.true(tm.TypeUtil.isPojo(Object.create(Object.prototype)));
    t.true(tm.TypeUtil.isPojo(new Object()));

    t.false(tm.TypeUtil.isPojo(true));
    t.false(tm.TypeUtil.isPojo(false));
    t.false(tm.TypeUtil.isPojo(null));
    t.false(tm.TypeUtil.isPojo(undefined));
    t.false(tm.TypeUtil.isPojo(BigInt(0)));
    t.false(tm.TypeUtil.isPojo(BigInt(1)));
    t.false(tm.TypeUtil.isPojo(new Date()));
    t.false(tm.TypeUtil.isPojo([]));
    t.false(tm.TypeUtil.isPojo([true]));
    t.false(tm.TypeUtil.isPojo(function () {}));
    t.false(tm.TypeUtil.isPojo(NaN));
    t.false(tm.TypeUtil.isPojo(-Infinity));
    t.false(tm.TypeUtil.isPojo(+Infinity));
    t.false(tm.TypeUtil.isPojo("true"));
    t.false(tm.TypeUtil.isPojo("false"));
    t.false(tm.TypeUtil.isPojo(""));
    t.false(tm.TypeUtil.isPojo("qwerty"));
    t.false(tm.TypeUtil.isPojo("1"));
    t.false(tm.TypeUtil.isPojo("0"));
    t.false(tm.TypeUtil.isPojo("1.0"));
    t.false(tm.TypeUtil.isPojo("0.0"));
    t.false(tm.TypeUtil.isPojo(1.1));
    t.false(tm.TypeUtil.isPojo(1));
    t.false(tm.TypeUtil.isPojo(0));
    t.false(tm.TypeUtil.isPojo(-1));
    t.false(tm.TypeUtil.isPojo(-1.1));
    t.false(tm.TypeUtil.isPojo(new Boolean(true)));
    t.false(tm.TypeUtil.isPojo(new Boolean(false)));
    t.false(tm.TypeUtil.isPojo(new RegExp("")));
    t.false(tm.TypeUtil.isPojo(Object.create({})));
    t.false(tm.TypeUtil.isPojo(Object.create(null)));
    t.false(tm.TypeUtil.isPojo(new (class X {})));
    t.false(tm.TypeUtil.isPojo(Buffer.from("test")));

    t.end();
});