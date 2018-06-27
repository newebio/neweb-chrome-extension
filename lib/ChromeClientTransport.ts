import { IClientTransport, IClientTransportInputMessage, IClientTransportOutputMessage } from "neweb-core";
import { BehaviorSubject, Subject } from "rxjs";
export interface IClientTransportConfig {
    portName: string;
}
export class ChromeClientTransport implements IClientTransport {
    onConnect = new BehaviorSubject<void>(undefined);
    onConnecting = new Subject<void>();
    onDisconnect = new Subject<void>();
    inputMessage = new Subject<IClientTransportInputMessage>();
    outputMessage = new Subject<IClientTransportOutputMessage>();
    port: chrome.runtime.Port;
    constructor(protected config: IClientTransportConfig) {
        this.port = chrome.runtime.connect({ name: this.config.portName });
        this.port.onDisconnect.addListener(() => this.onDisconnect.next());
        this.port.onMessage.addListener((message) => this.inputMessage.next(message));
        this.outputMessage.subscribe((message) => this.port.postMessage(message));
    }
}
export default ChromeClientTransport;
