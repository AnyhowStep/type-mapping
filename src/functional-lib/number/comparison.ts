import {pipe} from "../operator";
import {finiteNumber} from "./number";
import {SafeMapper} from "../../mapper";
import {literal} from "../literal";
import {makeMappingError} from "../../error-util";

export function gt (x : number) : SafeMapper<number> {
    return pipe(
        finiteNumber(),
        (name : string, num : number) : number => {
            if (num > x) {
                return num;
            } else {
                throw makeMappingError({
                    message : `${name} must be greater than ${x}`,
                    inputName : name,
                    actualValue : num,
                    expected : `greater than ${x}`,
                });
            }
        }
    );
}

export function lt (x : number) : SafeMapper<number> {
    return pipe(
        finiteNumber(),
        (name : string, num : number) : number => {
            if (num < x) {
                return num;
            } else {
                throw makeMappingError({
                    message : `${name} must be less than ${x}`,
                    inputName : name,
                    actualValue : num,
                    expected : `less than ${x}`,
                });
            }
        }
    );
}

export function gtEq (x : number) : SafeMapper<number> {
    return pipe(
        finiteNumber(),
        (name : string, num : number) : number => {
            if (num >= x) {
                return num;
            } else {
                throw makeMappingError({
                    message : `${name} must be greater than, or equal to ${x}`,
                    inputName : name,
                    actualValue : num,
                    expected : `greater than, or equal to ${x}`,
                });
            }
        }
    );
}

export function ltEq (x : number) : SafeMapper<number> {
    return pipe(
        finiteNumber(),
        (name : string, num : number) : number => {
            if (num <= x) {
                return num;
            } else {
                throw makeMappingError({
                    message : `${name} must be less than, or equal to ${x}`,
                    inputName : name,
                    actualValue : num,
                    expected : `less than, or equal to ${x}`,
                });
            }
        }
    );
}

export function range (args : {
    gt? : number,
    lt? : number,
    gtEq? : number,
    ltEq? : number,
}) : SafeMapper<number> {
    const min = (
        (typeof args.gt == "number") ?
        (
            (typeof args.gtEq == "number") ?
            (
                (args.gt >= args.gtEq) ?
                {
                    f : gt(args.gt),
                    inclusive : false,
                    value : args.gt,
                } :
                {
                    f : gtEq(args.gtEq),
                    inclusive : true,
                    value : args.gtEq,
                }
            ) :
            {
                f : gt(args.gt),
                inclusive : false,
                value : args.gt,
            }
        ) :
        (
            (typeof args.gtEq == "number") ?
            {
                f : gtEq(args.gtEq),
                inclusive : true,
                value : args.gtEq,
            } :
            undefined
        )
    );
    const max = (
        (typeof args.lt == "number") ?
        (
            (typeof args.ltEq == "number") ?
            (
                (args.lt <= args.ltEq) ?
                {
                    f : lt(args.lt),
                    inclusive : false,
                    value : args.lt,
                } :
                {
                    f : ltEq(args.ltEq),
                    inclusive : true,
                    value : args.ltEq,
                }
            ) :
            {
                f : lt(args.lt),
                inclusive : false,
                value : args.lt,
            }
        ) :
        (
            (typeof args.ltEq == "number") ?
            {
                f : ltEq(args.ltEq),
                inclusive : true,
                value : args.ltEq,
            } :
            undefined
        )
    );

    if (min == undefined) {
        if (max == undefined) {
            return finiteNumber();
        } else {
            return max.f;
        }
    } else {
        if (max == undefined) {
            return min.f;
        } else {
            if (min.value > max.value) {
                throw new Error(`Min value cannot be greater than max value`);
            } else if (min.value == max.value) {
                if (min.inclusive && max.inclusive) {
                    return literal(min.value);
                } else {
                    throw new Error(`Min value cannot be equal to max value unless using gtEq and ltEq`);
                }
            } else {
                return pipe(
                    min.f,
                    max.f
                );
            }
        }
    }
}