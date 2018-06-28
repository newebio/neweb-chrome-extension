export class History {
    constructor(protected config: { navigate: (url: string) => void }) {
        window.addEventListener("popstate", (e) => {
            this.config.navigate(e.state);
        });
    }
    public push(url: string) {
        this.config.navigate(url);
        window.history.pushState(url, "", url);
    }
    public replace(url: string) {
        this.config.navigate(url);
        window.history.replaceState(url, "", url);
    }
}
export default History;
