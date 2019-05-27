import * as tm from "../../../../dist";

declare function isPipeable<
    A extends tm.AnyMapper,
    B extends tm.AnyMapper
> (a : A, b : B) : tm.IsPipeable<A, B>;

export const expectTrue_4_extends_number = isPipeable(
    () => {
        return 4 as 4;
    },
    (_name : string, _mixed : number) => {
        return _mixed;
    }
);
export const expectFalse_4_not_extends_boolean = isPipeable(
    () => {
        return 4 as 4;
    },
    (_name : string, _mixed : boolean) => {
        return _mixed;
    }
);
export const expectFalse_number_not_extends_4 = isPipeable(
    () => {
        return 5 as number;
    },
    (_name : string, _mixed : 4) => {
        return _mixed;
    }
);
export const expectTrue_obj_extends = isPipeable(
    () => {
        return {
            a : "hi"
        };
    },
    (_name : string, _mixed : { a : string|number}) => {
        return _mixed;
    }
);
export const expectFalse_obj_not_extends = isPipeable(
    () => {
        return {
            a : "hi"
        };
    },
    (_name : string, _mixed : { a : string|number, b : boolean}) => {
        return _mixed;
    }
);