interface Function {
    /**
        This is probably `undefined` on Internet Explorer.
        I want this to be optional but TypeScript complains
        about lib.es.2015.core.d.ts...

        Even though I'm targeting es5...
    */
    readonly name : string,
    //readonly name? : string,
}