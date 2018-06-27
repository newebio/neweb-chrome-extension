import { ClientPageRenderer, Client } from "neweb-core";
import { ChromeClientTransport } from "./ChromeClientTransport";

export class ChromeClient {
    constructor(
        protected config: {
            renderer: ClientPageRenderer;
        },
    ) {
        const transport = new ChromeClientTransport({
            portName: "default",
        });
        const client = new Client({
            transport,
            url: window.location.href,
            renderer: config.renderer,
        });
        const realHistoryReplaceState = history.replaceState.bind(history);
        const realPushState = history.pushState.bind(history);
        window.history.pushState = (url: string) => {
            client.emitNavigate.next({ url });
            realPushState(url, "", url);
        };
        window.history.replaceState = (url: string) => {
            client.emitNavigate.next({ url });
            realHistoryReplaceState(url, "", url);
        };
    }
}
export default ChromeClient;
