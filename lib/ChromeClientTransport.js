"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class ChromeClientTransport {
    constructor(config) {
        this.config = config;
        this.onConnect = new rxjs_1.BehaviorSubject(undefined);
        this.onConnecting = new rxjs_1.Subject();
        this.onDisconnect = new rxjs_1.Subject();
        this.inputMessage = new rxjs_1.Subject();
        this.outputMessage = new rxjs_1.Subject();
        this.port = chrome.runtime.connect({ name: this.config.portName });
        this.port.onDisconnect.addListener(() => this.onDisconnect.next());
        this.port.onMessage.addListener((message) => this.inputMessage.next(message));
        this.outputMessage.subscribe((message) => this.port.postMessage(message));
    }
}
exports.ChromeClientTransport = ChromeClientTransport;
exports.default = ChromeClientTransport;
