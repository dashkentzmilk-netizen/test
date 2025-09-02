import { Dealer } from "./types";
interface WidgetConfig {
    el: string;
    dealers?: Dealer[];
}
export declare class WidgetCatalog {
    private config;
    private container;
    private root;
    constructor(config: WidgetConfig);
    run(): Promise<void>;
    private showError;
    destroy(): void;
}
export default WidgetCatalog;
//# sourceMappingURL=WidgetCatalog.d.ts.map