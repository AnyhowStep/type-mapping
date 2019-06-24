export type SyncReturnType<F extends (...args : any[]) => any> = (
    ReturnType<F> extends PromiseLike<infer T> ?
    T :
    ReturnType<F>
);