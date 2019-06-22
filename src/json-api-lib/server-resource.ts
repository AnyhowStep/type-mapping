
import {
    SafeMapper,
    ExpectedInput,
} from "../mapper";
import {FluentMapper} from "../fluent-mapper";
import * as fLib from "../fluent-lib";
import {ClientResource, ExpectedInputClientResource, clientResource} from "./client-resource";

/**
 *  @see {@link serverResource}
 */
export interface ServerResource extends ClientResource {
    id : string;
}
/**
 *  @see {@link serverResource}
 */
export interface ExpectedInputServerResource extends ExpectedInputClientResource {
    id : string;
}
/**
 *  @see {@link clientResource}
 *  @see {@link ServerResource}
 *  @see {@link ExpectedInputServerResource}
 */
export const serverResource : (
    () => FluentMapper<SafeMapper<ServerResource> & ExpectedInput<ExpectedInputServerResource>>
) = () => fLib.deepMerge(
    clientResource(),
    fLib.object({
        id : fLib.string(),
    })
);
