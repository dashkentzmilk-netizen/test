import WidgetCatalog from "./WidgetCatalog";

if (typeof window !== "undefined") {
  (window as any).WidgetCatalog = WidgetCatalog;
}

export default WidgetCatalog;
