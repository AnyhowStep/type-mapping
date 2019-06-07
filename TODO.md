+ [`mysql`](https://github.com/mysqljs/mysql)-specific mappers

+ Maybe implement `deepEqual<>()`?
+ Implement route declarations in another package?
+ More compile-time tests
+ Run-time tests

target = what version of ES syntax to use
lib = what builtins to use
they’re separate because you can polyfill builtins but not syntax
If targeting es5 then you should specify at least lib: [ 'es5' ]
Add ‘dom` to that if targeting the web

+ Delete `cache<>()` mapper. It is useless.