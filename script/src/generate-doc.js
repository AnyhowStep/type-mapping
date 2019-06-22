#!/usr/bin/env node

/*
    1. git clone https://github.com/TypeStrong/typedoc.git
    2. cd typedoc/
    3. npm install
*/
var td = require(__dirname + "/../../../typedoc/dist/lib/cli.js");
new td.CliApplication();