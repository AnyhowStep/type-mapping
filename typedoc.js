module.exports = {
    "out": __dirname + "/doc",
    "json": __dirname + "/doc.json",
    "mode": "modules",
    "name": "type-mapping",
    "tsconfig": __dirname + "/tsconfig.json",
    "exclude": __dirname + "/+(node_modules|test|script)/**/*",
    "excludeNotExported": false,
};
console.log(module.exports);