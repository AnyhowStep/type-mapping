# `type-mapping`

Never trust incoming data. Always check it.

This package was written to help check/sanitize/map data declaratively.

Each `Mapper` is a function.

-----

### Goals

+ Usability

  It must be easy for developers to understand and use.

  Complex `Mapper`s are created using function composition by default.
  However, a fluent API also exists and may be used instead.

+ Extensibility

  Easy for developers to create their own custom `Mapper`s,
  and use them with the default ones.

  All `Mapper`s are just functions.
  Creating a `Mapper` is as easy as creating a function
  has certain properties.

+ Composability

  Developers should be able to integrate this package
  into their own packages to boost run-time type safety.

+ Use Case Coverage

  The default `Mapper`s should cover 95+% of common data mapping scenarios.

  They should also facilitate building custom `Mapper`s,
  if they cannot satisfy a custom use case.

  Common use cases,
  + Mapping data from/to incoming HTTP requests/API calls/websocket events
  + Mapping data from/to "schema-on-write" databases (e.g. MySQL)
  + Mapping data from/to "schema-on-read" databases (e.g. Mongo)

+ `node` and Browser support

  This package should work on as many `node` and Browser environments as possible.
  This package should have as few run-time dependencies as possible (zero at the moment).

+ Safety

  This package must not map data that is invalid.
  Bugs are inevitable but they should be fixed and tested for
  as quickly as possible.

-----

### Non-Goals

+ Performance

  Performance is somewhat a consideration.
  However, safety, correctness and usability have priority over performance.

+ Reflection

-----

### Installation

```
npm install --save type-mapping
```

-----

### Basic Usage

```ts
import * as tm from "type-mapping";

const arr = tm.array(tm.stringToUnsignedInteger());
/*
    OK!
    [1,2,3,4,5]
*/
arr("a-name-identifying-this-array", [1,2,3,4,5]);
/*
    OK!
    [1,2,3,4,5]
*/
arr("string-to-unsigned-int", ["1",2,"3",4,5]);
/*
    Error thrown:
    invalid[0] is not an unsigned integer, and cannot be cast
*/
arr("invalid", ["uh-oh",2,"3",4,5]);

const user = tm.object({
    userId : tm.bigInt(),
    firstName : tm.stringLength({ min : 1, max : 1024 }),
    lastName  : tm.stringLength({ min : 1, max : 1024 }),
    banned : tm.boolean(),
});
/*
    OK!
*/
user("john", {
    userId : BigInt(5),
    firstName : "John",
    lastName : "Doe",
    banned : false,
});
/*
    Error thrown:
    invalid.userId must be bigint; received string
*/
user("invalid", {
    userId : "qwerty",
    firstName : "",
    lastName : "Doe",
    banned : 1,
});

const stringOrUndefined = tm.orUndefined(tm.string());
//OK
stringOrUndefined("is-string", "hello");
//OK
stringOrUndefined("is-undefined", undefined);
//Error
stringOrUndefined("is-54", 54);
```

See the `test` directory for more examples.

-----

### Fluent API

The `stringOrUndefined` example is simple and shows that
you may combine `Mapper`s.

However, with more complex `Mapper`s, function composition
gets unwieldly.

A fluent API exists that may be used.

```ts
//We changed the import to "type-mapping/fluent"
import * as tm from "type-mapping/fluent";

const stringOrUndefined = tm.string().orUndefined();
//OK
stringOrUndefined("is-string", "hello");
//OK
stringOrUndefined("is-undefined", undefined);
//Error
stringOrUndefined("is-54", 54);
```

A more complex example,
```ts
import * as tm from "type-mapping/fluent";
enum E {
    A = "X",
    B = "Y",
    C = "Z",
}
/*
    Expected Input:
    (
        {
            anEnum: E;
            requiredStringButMayBeUndefined: string | undefined;
            stringOrNumber: string | number;
            nullableMysqlDateTime: Date | null;
            nullableMysqlDateTime2: Date | null;
            arrayOfEnumKey: ("A" | "B" | "C")[];
            literal_1_or_5: 1 | 5;
            nullOrNonEmptyString: string | null;
        } &
        {
            optionalString?: string | undefined;
        }
    )[]

    Output:
    {
        anEnum: E;
        optionalString: string | undefined;
        requiredStringButMayBeUndefined: string | undefined;
        stringOrNumber: string | number;
        nullableMysqlDateTime: Date | null;
        nullableMysqlDateTime2: Date | null;
        arrayOfEnumKey: ("A" | "B" | "C")[];
        literal_1_or_5: 1 | 5;
        nullOrNonEmptyString: string | null;
    }[]
*/
const objArrMapper = tm.object({
    anEnum : tm.enumValue(E),
    optionalString : tm.string().optional(),
    requiredStringButMayBeUndefined : tm.string().orUndefined(),
    stringOrNumber : tm.string().or(tm.finiteNumber()),
    nullableMysqlDateTime : tm.mysql.dateTime().orNull(),
    nullableMysqlDateTime2 : tm.mysql.dateTime(2).orNull(),
    arrayOfEnumKey : tm.enumKey(E).array(),
    literal_1_or_5 : tm.literal(1, 5),
    nullOrNonEmptyString : tm.emptyStringToNull().or(tm.string()),
}).array();
```

-----

### Default `Mapper`s

TODO, document all default mappers

The default mappers may be found in `src/functional-lib`

-----

### MySQL `Mapper`s

TODO, document all default MySQL mappers

The default MySQL mappers may be found in `src/mysql-lib`

```ts
import * as tm from "type-mapping";
const varChar255 = tm.mysql.varChar(255);
```

-----

### Fields

TODO, talk about fields and `Name<string>`

-----

### Decorators

The following decorators are provided,

+ `@prop(mapper : Mapper)`
+ `@setter(mapper : Mapper)`
+ `@method(...mappers : Mapper[])`
+ `func(...mappers : Mapper[])`

`func` is not quite a decorator but may be used to wrap a function.

-----

#### `@prop`

The `@prop(mapper : Mapper)` decorator is a generic property decorator
and takes a single `Mapper`. This decorator may be used on class properties.

During run-time, the decorator creates a `getter` and `setter` on
each class instance. Attempts to set the value of the property
will pass the value through the `Mapper` before setting the value.

```ts
class Clazz {
    @tm.prop(tm.unsignedInteger().orUndefined())
    x : number|undefined = undefined;
}
const c = new Clazz();
c.x = 1; //OK
c.x = -1; //Error, expected unsigned integer or undefined
c.x = undefined; //OK
c.x = null; //Error, expected unsigned integer or undefined
```

The `@prop` decorator also works with class inheritance,

```ts
class Base {
    @tm.prop(tm.gt(4))
    prop0 : number = 8;
}
class Derived extends Base {
    @tm.prop(tm.finiteNumber())
    prop0 : number = 9;
}
const c = new Derived();

c.prop0; //9
c.prop0 = 5; //OK
c.prop0 = 4; //Error, expected > 4
c.prop0 = 3; //Error, expected > 4
c.prop0 = 2; //Error, expected > 4
c.prop0 = 1; //Error, expected > 4
```

-----

#### `@setter`

The `@setter(mapper : Mapper)` decorator is a generic accessor decorator
and takes a single `Mapper`. This decorator may be used on class setters.

During run-time, the decorator replaces the `setter`
on the class prototype. Attempts to set the value of the property
will pass the value through the `Mapper` before being passed
to the `setter`.

```ts
let value : number|undefined = undefined;
class Clazz {
    @tm.setter(tm.unsignedInteger().orUndefined())
    set x (v : number|undefined) {
        value = v;
    }
    get x () {
        return value;
    }
}
const c = new Clazz();
c.x = 1; //OK
c.x = -1; //Error, expected unsigned integer or undefined
c.x = undefined; //OK
c.x = null; //Error, expected unsigned integer or undefined
```

-----

#### `@method`

The `@method(...mappers : Mapper[])` decorator is a generic method decorator
and takes a zero to many `Mapper`s. This decorator may be used on class methods.

During run-time, the decorator replaces the method's `value`
on the class prototype. Attempts to call the method
will pass the value through the `Mapper`s before being passed
to the method.

```ts
let value = 1;
class Clazz {
    @tm.method(tm.finiteNumber())
    foo (v : number) {
        value = v;
    }
}
const c = new Clazz();

c.foo(5);
value; //5
c.foo("6" as any); //Error, expected finite number
value; //5
```

Rest parameters are also supported, with the following syntax,

```ts
let value = 1;
let arr : string[] = [];
class Clazz {
    //Notice the `...[tm.string()]` syntax
    @tm.method(tm.finiteNumber(), ...[tm.string()])
    foo (v : number, ...a : string[]) {
        value = v;
        arr = a;
    }
}
const c = new Clazz();

c.foo(5); //OK
value; //5
arr; //[]

c.foo(6, "a", "b", "c"); //OK
value; //6
arr; //["a", "b", "c"]
c.foo(7, "a", "b", "c", 5 as any); //Error, expected string in argument 4
```

-----

#### `func`

The `func(...mappers : Mapper[])` function is not quite a decorator.
It is a generic function that takes a zero to many `Mapper`s.

The result may be used to wrap other functions and map their
arguments before calling the wrapped functions.

```ts
let value = 1;
const foo = tm.func(tm.finiteNumber())(
    (v : number) => {
        value = v;
    }
);

foo(5); //OK
value; //5
foo("6" as any); //Error, expected finite number
```

Rest parameters are also supported, with the following syntax,

```ts
let value = 1;
let arr : string[] = [];
//Notice the `...[tm.string()]` syntax
const foo = tm.func(tm.finiteNumber(), ...[tm.string()])(
    (v : number, ...a : string[]) => {
        value = v;
        arr = a;
    }
)

foo(5); //OK
value; //5
arr; //[]
foo("6" as any); //Error, expected finite number

foo(6, "a", "b", "c"); //OK
value; //6
arr; //["a", "b", "c"]
foo(7, "a", "b", "c", 5 as any); //Error, expected string in argument 4
```

-----

### Custom `Mapper`s

A `Mapper` is anything that implements the `Mapper<>` interface,
```ts
export interface Mapper<HandledInputT, OutputT> {
    (name : string, mixed : HandledInputT) : OutputT,
}
```

It is a function with two parameters.
`name` is the name of the value being mapped.
`mixed` is usually a value of type `unknown`.
Extra care is needed to correctly map (or reject) values of type `unknown`.

-----

Usually, you should implement `SafeMapper<>`,
```ts
export type SafeMapper<OutputT> = (
    Mapper<unknown, OutputT>
);
```

-----

All `Mapper<HandledInputT, OutputT>` types must satisfy the following properties,

+ Correctness

  When given an input of type `HandledInputT`,
  it **must** handle it correctly.

  It **must not** silently produce invalid output.

  It **must not** throw an `Error` on valid input.

  If you pass an input that is not of type `HandledInputT`,
  the behaviour is undefined.

+ Idempotence

  A `Mapper<>` must satisfy the following,

  ```ts
  deepEquals(f(x), f(f(x)))
  ```

  That is, if `f(0)` is `"hello"`, then `f("hello")` must be `"hello"`.

+ Immutability

  A `Mapper<>` must **NEVER** modify its input argument.

  That is, all inputs must be treated as immutable.

  A `Mapper<>` may,

  + Return the same input
  + Return a copy of the input
  + Return a completely different object

-----

An example of a custom mapper,

```ts
const evenNumberOnly : tm.SafeMapper<number> = (name : string, mixed : unknown) : number => {
    if (typeof mixed != "number") {
        throw new Error(`${name} must be a number`);
    }
    if (!isFinite(mixed)) {
        throw new Error(`${name} must be a finite number`);
    }
    if (mixed % 2 == 0) {
        return mixed;
    } else {
        throw new Error(`${name} must be an even number`);
    }
};
```

Now, you may use the mapper as-is, or compose it with other mappers,

```ts
import * as tm from "type-mapping";
const evenNumberOrString = tm.or(
    evenNumberOnly,
    tm.string()
);

evenNumberOnly("x", 3); //Error, x must be an even number
evenNumberOnly("x", 4); //OK
evenNumberOnly("x", "qwerty"); //Error, x must be a number

evenNumberOrString("x", 3); //Error, x must be an even number
evenNumberOrString("x", 4); //OK
evenNumberOrString("x", "qwerty"); //OK
```

-----

### `Buffer` support

TODO, how `Buffer` is supported on environments that do not support `Buffer`.

-----

### `BigInt` support

This package supports environments that have `bigint` primitive support.
This package tries its best to support environments that use a `BigInt` polyfill.

If using a polyfill,
the polyfill must satisfy the following,

+ Implement `function BigInt (value : string|number|bigint) : Object`
  on the global scope (`window`/`global`/`globalThis`).

  It must return an `Object`. Not a primitive.

+ Implement `.toString()`

The simplest supported polyfill, with no error checking, is,

```ts
(global as any).BigInt = ((value : string|number|bigint) => {
    return {
        toString : () => {
            return String(value);
        },
    };
}) as any;
```

-----

### `Optional`

TODO, how `Optional` affects `Mapper`s.

-----

### `HandledInput` vs `MappableInput` vs `ExpectedInput`

In general,

+ `ExpectedInput` extends `MappableInput`
+ `MappableInput` extends `HandledInput`

-----

The `HandledInput` of a `Mapper` is the range of values
it will handle correctly.

If given a type inside the range of `HandledInput`,
it must throw an `Error` on invalid input, and
must map valid inputs correctly.

If you pass a type outside the range of `HandledInput`,
the behaviour is undefined.

It may behave as intended, or do something else completely.

-----

The `MappableInput` of a `Mapper` is the range of values
it will (probably) map successfully.

TypeScript's type system may not be strong enough
to fully express the range of values that will
map successfully.

But, in an ideal world, passing a type inside the range
of `MappableInput` will **always** guarantee a successful
mapping with zero `Error`s thrown.

-----

The `ExpectedInput` of a `Mapper` is the range of values
it would ideally like to receive.

For example, a `Mapper` may map `string` values to `number`,
and perform no mapping on `number` values.

The `MappableInput` is `string|number`.

However, in your application logic,
you may expect to **never** pass `number` to the `Mapper`.

So, you set the `ExpectedInput` to `string`.

```ts
import * as tm from "type-mapping";

declare const stringToNumber : (
    & tm.SafeMapper<number>
    & tm.ExpectedInput<string>
    & tm.MappableInput<string|number>
);

//OK
tm.tryMapExpected(stringToNumber, "x", "23");
//Compile-Error, expected string
//Even though this will work during run-time
tm.tryMapExpected(stringToNumber, "x", 23);
//Compile-Error, expected string
//Will also throw an `Error` during run-time
tm.tryMapExpected(stringToNumber, "x", true);

//OK
tm.tryMapMappable(stringToNumber, "x", "23");
//OK, `number` is mappable
tm.tryMapMappable(stringToNumber, "x", 23);
//Compile-Error, expected string|number
//Will also throw an `Error` during run-time
tm.tryMapMappable(stringToNumber, "x", true);

//OK
tm.tryMapHandled(stringToNumber, "x", "23");
//OK
tm.tryMapHandled(stringToNumber, "x", 23);
//OK, HandledInput is `unknown`.
//So, it will handle `boolean` correctly...
//By throwing an `Error` during run-time.
tm.tryMapHandled(stringToNumber, "x", true);
```

-----

### `_debug`

TODO, how to debug compile-time types

-----

### `Mapper` operations

-----

### `Mapper` predicates

-----

### `Mapper` queries

-----

### `EnumUtil`

-----

### `BigIntUtil`

-----

### `ErrorUtil`

-----

### `TypeUtil`

-----

### Contributing

-----

### Tests

```
npm run sanity-check
```

The above command rebuilds this package and runs the compile-time and run-time tests.

-----

### Compatibility with `schema-decorator`

This package is the successor to `schema-decorator`, and meant to replace it.
Many breaking changes have been made.

In particular, the concept of `Accepts` and `CanAccept` have been replaced with,
`ExpectedInput` and `MappableInput` respectively.

There is no `Field` class anymore.
Instead, a `Mapper` is a `Field` when it also extends the `Name<>` interface.

Apart from those breaking changes, you may use the mappers here with
the mappers from `schema-decorator`.

The route declaration feature has also been removed and will
be part of another package. (TODO, create replacement package.)

-----

# Cookbook

The examples here use the fluent API.

(TODO, examples of common data mapping scenarios and how to handle them)