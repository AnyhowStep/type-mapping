import {pipe} from "../operator";
import {finiteNumber} from "./number";
import {SafeMapper} from "../../mapper";
import {literal} from "../literal";

export function gt (x : number) : SafeMapper<number> {
    return pipe(
        finiteNumber(),
        (name : string, num : number) : number => {
            if (num > x) {
                return num;
            } else {
                throw new Error(`${name} must be greater than ${x}`);
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
                throw new Error(`${name} must be less than ${x}`);
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
                throw new Error(`${name} must be greater than, or equal to ${x}`);
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
                throw new Error(`${name} must be less than, or equal to ${x}`);
            }
        }
    );
}

export function inclusiveRange (args : {
    min? : number,
    max? : number,
}) : SafeMapper<number> {
    if (typeof args.min == "number") {
        if (typeof args.max == "number") {
            if (args.min > args.max) {
                throw new Error(`"min" cannot be greater than "max"`);
            } else if (args.min == args.max) {
                return literal(args.min);
            } else {
                return pipe(
                    gtEq(args.min),
                    ltEq(args.max)
                );
            }
        } else {
            return gtEq(args.min);
        }
    } else if (typeof args.max == "number") {
        return ltEq(args.max);
    } else {
        return finiteNumber();
    }
}