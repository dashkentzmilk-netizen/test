export interface Product {
    name: string;
    id: string;
    price: number;
    image: string;
    count?: number;
}
export type Page = "main" | "catalog" | "cart";
export type Dealer = string;
export interface Filters {
    dealers: Dealer[];
    sort: "asc" | "des" | "init";
}
//# sourceMappingURL=index.d.ts.map