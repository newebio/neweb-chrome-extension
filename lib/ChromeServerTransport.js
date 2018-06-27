"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const ChromeServerTransportClient_1 = require("./ChromeServerTransportClient");
class ChromeServerTransport {
    constructor() {
        this.onConnect = new rxjs_1.Subject();
        chrome.runtime.onConnect.addListener((port) => this.onConnect.next(new ChromeServerTransportClient_1.ChromeServerTransportClient({ port })));
    }
}
exports.default = ChromeServerTransport;
