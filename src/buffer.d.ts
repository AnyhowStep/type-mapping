//This declaration lets us avoid using @types/node
interface Buffer extends ArrayBufferLike {
    ___doesNotExist? : any;
}