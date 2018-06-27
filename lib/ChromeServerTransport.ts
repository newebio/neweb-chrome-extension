import { IServerTransport, IServerTransportClient } from "neweb-core";
import { Subject } from "rxjs";
import { ChromeServerTransportClient } from "./ChromeServerTransportClient";
export class ChromeServerTransport implements IServerTransport {
    onConnect = new Subject<IServerTransportClient>();
    constructor() {
        chrome.runtime.onConnect.addListener((port) => this.onConnect.next(new ChromeServerTransportClient({ port })));
    }
}
export default ChromeServerTransport;
