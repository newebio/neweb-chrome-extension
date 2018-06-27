"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class ChromeServerTransportClient {
    constructor(config) {
        this.config = config;
        this.inputMessage = new rxjs_1.Subject();
        this.outputMessage = new rxjs_1.Subject();
        const onMessage = (message) => {
            this.inputMessage.next(message);
        };
        const inputSubscription = this.outputMessage.subscribe((message) => this.config.port.postMessage(message));
        this.config.port.onMessage.addListener(onMessage);
        this.config.port.onDisconnect.addListener(() => {
            this.config.port.onMessage.removeListener(onMessage);
            inputSubscription.unsubscribe();
        });
    }
    getSessionId() {
        return "default";
    }
    getExtraInfo() {
        return {};
    }
}
exports.ChromeServerTransportClient = ChromeServerTransportClient;
exports.default = ChromeServerTransportClient;
