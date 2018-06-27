"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_core_1 = require("neweb-core");
const ChromeClientTransport_1 = require("./ChromeClientTransport");
class ChromeClient {
    constructor(config) {
        this.config = config;
        const transport = new ChromeClientTransport_1.ChromeClientTransport({
            portName: "default",
        });
        const client = new neweb_core_1.Client({
            transport,
            url: window.location.href,
            renderer: config.renderer,
        });
        const realHistoryReplaceState = history.replaceState.bind(history);
        const realPushState = history.pushState.bind(history);
        window.history.pushState = (url) => {
            client.emitNavigate.next({ url });
            realPushState(url, "", url);
        };
        window.history.replaceState = (url) => {
            client.emitNavigate.next({ url });
            realHistoryReplaceState(url, "", url);
        };
    }
}
exports.ChromeClient = ChromeClient;
exports.default = ChromeClient;
