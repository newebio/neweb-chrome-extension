import { Subject } from "rxjs";
import {
    IServerTransportClient,
    IServerTransportClientInputMessage,
    IServerTransportClientOutputMessage,
} from "neweb-core";
export class ChromeServerTransportClient implements IServerTransportClient {
    inputMessage = new Subject<IServerTransportClientInputMessage>();
    outputMessage = new Subject<IServerTransportClientOutputMessage>();
    constructor(protected config: { port: chrome.runtime.Port }) {
        const onMessage = (message: any) => {
            this.inputMessage.next(message);
        };
        const inputSubscription = this.outputMessage.subscribe((message) => this.config.port.postMessage(message));
        this.config.port.onMessage.addListener(onMessage);
        this.config.port.onDisconnect.addListener(() => {
            this.config.port.onMessage.removeListener(onMessage);
            inputSubscription.unsubscribe();
        });
    }
    public getSessionId() {
        return "default";
    }
    public getExtraInfo() {
        return {};
    }
}
export default ChromeServerTransportClient;
