"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const neweb_core_1 = require("neweb-core");
const ChromeClientTransport_1 = require("./ChromeClientTransport");
const History_1 = require("./History");
class ChromeClient {
    constructor(config) {
        this.config = config;
        const transport = new ChromeClientTransport_1.ChromeClientTransport({
            portName: "default",
        });
        this.client = new neweb_core_1.Client({
            transport,
            url: window.location.href,
            renderer: config.renderer,
        });
        this.history = new History_1.History({
            navigate: (url) => this.client.emitNavigate.next({ url }),
        });
    }
    getHistory() {
        return this.history;
    }
    start() {
        //
    }
}
exports.ChromeClient = ChromeClient;
exports.default = ChromeClient;
