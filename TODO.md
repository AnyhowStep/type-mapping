+ [`mysql`](https://github.com/mysqljs/mysql)-specific mappers
+ Implement `rename(from, mapperWithNameLiteral)`
+ Implement `derive(from, mapperWithNameLiteral)`
+ Implement `LazyNested<>` from `schema-decorator`
+ Implement `renameMap<>({ a : mapperA, b : mapperB, c : mapperC })`;
  same as `deepMerge(rename("a", mapperA), rename("b", mapperB), rename("c", mapperC))`
+ Implement `deriveMap<>({ a : mapperA, b : mapperB, c : mapperC })`;
  same as `deepMerge(derive("a", mapperA), derive("b", mapperB), derive("c", mapperC))`
+ Clean up `field` and `field-map`; can probably delete `field`
+ Maybe implement `deepEqual<>()`?
+ `.tryMap(mixed : unknown)` to `FluentMapper<>()`;
  ```ts
  try {
      return {
          success : true,
          mapped : f(name, mixed),
      };
  } catch (err) {
      return {
          success : false,
          err : err,
      };
  }
  ```
+ `.map(x : ExpectedInputOf<F>)` to `FluentMapper<>()`;
  ```ts
  return f(name, x)
  ```
+ Debug if something is the expected type,
  ```ts
  ._debugIsExpectedType<X>(x : (
      IsNever<X> extends true ?
      [X, "is not expected type"] :
      IsAny<X> extends true ?
      [X, "is not expected type"] :
      X extends ExpectedInputOf<F> ?
      X :
      [X, "is not expected type"]
  )) : void
  ```
+ Debug if something is a mappable type,
  ```ts
  ._debugIsExpectedType<X>(x : (
      IsNever<X> extends true ?
      [X, "is not mappable type"] :
      IsAny<X> extends true ?
      [X, "is not mappable type"] :
      X extends MappableInputOf<F> ?
      X :
      [X, "is not mappable type"]
  )) : void
  ```
+ Debug if something is handled type
+ Debug if something is output type
+ Reconsider implementing `@assert<>()` decorator for classes?
  Hesitant because it goes against design philosophy.
  Pollutes `console.log()` with `[Getter/Setter]` outputs instead of actual values
+ Implement route declarations in another package?
+ More compile-time tests
+ Run-time tests