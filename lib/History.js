"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class History {
    constructor(config) {
        this.config = config;
        window.addEventListener("popstate", (e) => {
            this.config.navigate(e.state);
        });
    }
    push(url) {
        this.config.navigate(url);
        window.history.pushState(url, "", url);
    }
    replace(url) {
        this.config.navigate(url);
        window.history.replaceState(url, "", url);
    }
}
exports.History = History;
exports.default = History;
