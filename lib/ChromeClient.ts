import { ClientPageRenderer, Client } from "neweb-core";
import { ChromeClientTransport } from "./ChromeClientTransport";
import { History } from "./History";

export class ChromeClient {
    public history: History;
    protected client: Client;
    constructor(
        protected config: {
            renderer: ClientPageRenderer;
        },
    ) {
        const transport = new ChromeClientTransport({
            portName: "default",
        });
        this.client = new Client({
            transport,
            url: window.location.href,
            renderer: config.renderer,
        });
        this.history = new History({
            navigate: (url) => this.client.emitNavigate.next({ url }),
        });
    }
    public getHistory() {
        return this.history;
    }
    public start() {
        //
    }
}
export default ChromeClient;
