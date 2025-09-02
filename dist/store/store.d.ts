import { Dealer, Filters, Page, Product } from "../types";
interface CartItem extends Product {
    count: number;
}
declare class Goods {
    goods: Product[];
    dealers: Dealer[];
    configDealers: Dealer[];
    currentPage: Page;
    filters: Filters;
    filteredGoods: Product[];
    cart: CartItem[];
    expiryTime: number;
    private readonly CART_STORAGE_KEY;
    private readonly CART_EXPIRY_KEY;
    private readonly CART_EXPIRY_TIME;
    private readonly CURRENT_PAGE_KEY;
    constructor();
    private loadCartFromStorage;
    private saveCartToStorage;
    private clearCartFromStorage;
    private loadCurrentPageFromStorage;
    private saveCurrentPageToStorage;
    private loadFiltersFromURL;
    private saveFiltersToURL;
    getGoods(dealers?: Dealer[]): Promise<void>;
    getDealers(): Promise<void>;
    setDealersFromConfig(dealers: Dealer[]): void;
    initializeStore(): Promise<void>;
    getFilteredGoods(dealers?: Dealer[]): Promise<void>;
    setCurrentPage(page: Page): void;
    setCart(cart: CartItem[]): void;
    setSort(sort: Filters["sort"]): void;
    setFilter(dealers: Filters["dealers"]): void;
    addToCart(product: Product): void;
    removeFromCart(id: string): void;
    clearCart(): void;
    setItemAmount(id: string, amount: number): void;
    get sortedGoods(): Product[];
    get timeToExpire(): number;
    get getItemAmount(): (id: string) => number;
    get isInCart(): (id: string) => boolean;
    get cartTotalPrice(): number;
}
declare const store: Goods;
export { store };
//# sourceMappingURL=store.d.ts.map