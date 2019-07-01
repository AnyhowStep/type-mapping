+ [`mysql`](https://github.com/mysqljs/mysql)-specific mappers
    + Tests needed
+ `json-api-lib`-specific mappers
    + More tests needed

+ Maybe implement `deepEqual<>()`?
+ Implement route declarations in another package?
+ More compile-time tests
+ Run-time tests
+ Reduce amount of function nesting for performance?
    + 9500 tests in 11s at the moment.
+ Idempotency tests `f(x) == f(f(x))`
+ Tests for run-time required
+ Fluent mapper method for run-time required
+ Implement `MappingError` for all mappers
+ Review all usages of `cast<>()`; if `srcMapper` succeeds, `castDelegate` cast to valid `dst` value
+ Review all mappers, top-level `MappingError`s should not refer to properties.
  Wrap property errors.

```ts
//Bad
throw makeMappingError({
    message : `${name}.property is invalid`
});
//Good
throw makeMappingError({
    message : `${name} is invalid`,
    propertyErrors : [
        makeMappingError({
            message : `${name}.property is invalid`
        }),
    ],
});
```