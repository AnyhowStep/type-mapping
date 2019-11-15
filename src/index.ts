/// <reference path="buffer.d.ts" />
import * as EnumUtil from "./enum-util";
export {EnumUtil};
import * as BigIntUtil from "./bigint-util";
export {BigIntUtil};
import * as FixedPointUtil from "./fixed-point-util";
export {FixedPointUtil};
import * as FloatingPointUtil from "./floating-point-util";
export {FloatingPointUtil};
export * from "./decorator";
import * as ErrorUtil from "./error-util";
export {ErrorUtil};
export * from "./field";
export * from "./field-map";
export * from "./functional-lib";
import * as jsonApi from "./json-api-lib";
export {jsonApi};
export * from "./mapper";
import * as mysql from "./mysql-lib";
export {mysql};
import * as TypeUtil from "./type-util";
export {TypeUtil};
export * from "./fluent-mapper";
export * from "./mapping-error";
export * from "./primitive";

/**
 * Convenience function.
 * Will create a native `bigint` (if natively supported),
 * or create a polyfilled `bigint` (if polyfilled).
 */
export function BigInt (x : number|string|bigint) : bigint {
    return TypeUtil.getBigIntFactoryFunctionOrError()(x);
}