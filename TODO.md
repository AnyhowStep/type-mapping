+ [`mysql`](https://github.com/mysqljs/mysql)-specific mappers

+ Clean up `field` and `field-map`; can probably delete `field`
+ Maybe implement `deepEqual<>()`?
+ Make all mapper composers preserve `name` and `__optional`
+ Reconsider implementing `@assert<>()` decorator for classes?
  Hesitant because it goes against design philosophy.
  Pollutes `console.log()` with `[Getter/Setter]` outputs instead of actual values
+ Implement route declarations in another package?
+ More compile-time tests
+ Run-time tests

target = what version of ES syntax to use
lib = what builtins to use
they’re separate because you can polyfill builtins but not syntax
If targeting es5 then you should specify at least lib: [ 'es5' ]
Add ‘dom` to that if targeting the web