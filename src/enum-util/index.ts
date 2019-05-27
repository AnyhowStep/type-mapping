//Please only pass enums here
export enum Enum {}
export type EnumElement = string|number;

export type EnumKey<E extends typeof Enum> = (
    {
        [k in Extract<keyof E, string>] : (
            E[k] extends EnumElement ?
            k :
            never
        )
    }[Extract<keyof E, string>]
);
export function getKeys<E extends typeof Enum> (e : E) : EnumKey<E>[] {
    return (
        Object.keys(e)
            .filter((k) => {
                if (/^\d/.test(k)) {
                    return false;
                }
                const v = (e as any)[k];
                return (
                    typeof v == "string" ||
                    typeof v == "number"
                );
            })
    ) as EnumKey<E>[];
}

export type EnumValue<E extends typeof Enum> = (
    Extract<E[EnumKey<E>], EnumElement>
);
export function getValues<E extends typeof Enum> (e : E) : EnumValue<E>[] {
    return getKeys(e).map(k => (e as any)[k]);
}

export type EnumEntry<E extends typeof Enum> = (
    {
        [k in Extract<keyof E, string>] : (
            E[k] extends EnumElement ?
            {
                key : k,
                value : E[k],
            } :
            never
        )
    }[Extract<keyof E, string>]
);
export function getEntries<E extends typeof Enum> (e : E) : EnumEntry<E>[] {
    return getKeys(e).map(k => {
        return {
            key : k,
            value : (e as any)[k],
        };
    }) as any;
}