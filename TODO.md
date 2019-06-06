+ [`mysql`](https://github.com/mysqljs/mysql)-specific mappers

+ Maybe implement `deepEqual<>()`?
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

+ Implement `Partial`; partialRenameMap, partialDeriveMap, partialObject, partialObjectFromArray, partialObjectFromMap
```ts
const fields = tm.fields({
    a : tm.finiteNumber(),
    b : tm.string(),
    c : tm.boolean(),
    d : tm.instanceOfDate(),
});
//This does not work
const partial = tm.objectFromArray(...Object.values(fields).map(f => tm.optional(f)));
//Gives us this,
const partial: tm.Mapper<unknown, {
    a: string | number | boolean | Date | undefined;
    b: string | number | boolean | Date | undefined;
    c: string | number | boolean | Date | undefined;
    d: string | number | boolean | Date | undefined;
}> & tm.ExpectedInput<{} & {
    a?: undefined;
    b?: undefined;
    c?: undefined;
    d?: undefined;
}> & tm.MappableInput<{} & {
    a?: undefined;
    b?: undefined;
    c?: undefined;
    d?: undefined;
}>
```

+ Use `Name<K>` instead of `{ __name : K }`