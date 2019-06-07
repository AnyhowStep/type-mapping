import {
    SafeMapper,
    ExpectedInput,
    MappableInput,
} from "../../mapper";
import {FluentMapper} from "../../fluent-mapper";
import * as fLib from "../../fluent-lib";
import { range } from "../../functional-lib";

/**
    May result in loss in precision if passing in
    `string|bigint`
*/
export function unsafeInt () : (
    FluentMapper<
        & SafeMapper<number>
        & ExpectedInput<number>
        & MappableInput<string | number | bigint>
    >
) {
    return fLib.toInteger();
}

function intDelegate (min : number, max : number) {
    return unsafeInt().pipe(
        range({
            gtEq : min,
            ltEq : max,
        })
    );
}

/**
    [-128, 127]
*/
export function tinyIntSigned () {
    return intDelegate(-128, 127);
}
/**
    [-32,768, 32,767]
*/
export function smallIntSigned () {
    return intDelegate(-32768, 32767);
}
/**
    [-8,388,608, 8,388,607]
*/
export function mediumIntSigned () {
    return intDelegate(-8388608, 8388607);
}
/**
    [-2,147,483,648, 2,147,483,647]
*/
export function intSigned () {
    return intDelegate(-2147483648, 2147483647);
}

/**
    [0, 255]
*/
export function tinyIntUnsigned () {
    return intDelegate(0, 255);
}
/**
    [0, 65535]
*/
export function smallIntUnsigned () {
    return intDelegate(0, 65535);
}
/**
    [0, 16777215]
*/
export function mediumIntUnsigned () {
    return intDelegate(0, 16777215);
}
/**
    [0, 4294967295]
*/
export function intUnsigned () {
    return intDelegate(0, 4294967295);
}