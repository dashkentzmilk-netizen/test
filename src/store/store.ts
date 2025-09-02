import { makeAutoObservable } from "mobx";
import { Dealer, Filters, Page, Product } from "../types";
import { getDealersRequest, getGoodsRequest } from "../api";

interface CartItem extends Product {
  count: number;
}

class Goods {
  goods: Product[] = [];
  dealers: Dealer[] = [];
  configDealers: Dealer[] = [];
  currentPage: Page = "main";
  filters: Filters = {
    dealers: [],
    sort: "init",
  };
  filteredGoods: Product[] = [];
  cart: CartItem[] = [];
  expiryTime = 0;

  private readonly CART_STORAGE_KEY = "cartData";
  private readonly CART_EXPIRY_KEY = "cartExpiry";
  private readonly CART_EXPIRY_TIME = 10 * 60 * 1000;
  private readonly CURRENT_PAGE_KEY = "currentPage";

  constructor() {
    makeAutoObservable(this);

    const savedCart = this.loadCartFromStorage();
    if (savedCart) {
      this.cart = savedCart;
    }

    const savedPage = this.loadCurrentPageFromStorage();
    if (savedPage) {
      this.currentPage = savedPage;
    }

    this.loadFiltersFromURL();
  }

  private loadCartFromStorage(): CartItem[] | null {
    try {
      const cartData = localStorage.getItem(this.CART_STORAGE_KEY);
      const expiryData = localStorage.getItem(this.CART_EXPIRY_KEY);

      if (!cartData || !expiryData) {
        return null;
      }

      const expiryTime = Number(expiryData);
      this.expiryTime = expiryTime;
      const currentTime = +Date.now();

      if (currentTime > expiryTime) {
        this.clearCartFromStorage();
        return null;
      }

      return JSON.parse(cartData);
    } catch (error) {
      console.error("Error loading cart from storage:", error);
      return null;
    }
  }

  private saveCartToStorage(): void {
    try {
      const currentTime = Date.now();
      const expiryTime = currentTime + this.CART_EXPIRY_TIME;
      this.expiryTime = expiryTime;

      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cart));
      localStorage.setItem(this.CART_EXPIRY_KEY, expiryTime.toString());
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  }

  private clearCartFromStorage(): void {
    try {
      localStorage.removeItem(this.CART_STORAGE_KEY);
      localStorage.removeItem(this.CART_EXPIRY_KEY);
      this.expiryTime = 0;
    } catch (error) {
      console.error("Error clearing cart from storage:", error);
    }
  }

  private loadCurrentPageFromStorage(): Page | null {
    try {
      const pageData = localStorage.getItem(this.CURRENT_PAGE_KEY);
      if (!pageData) {
        return null;
      }
      return JSON.parse(pageData);
    } catch (error) {
      console.error("Error loading current page from storage:", error);
      return null;
    }
  }

  private saveCurrentPageToStorage(): void {
    try {
      localStorage.setItem(
        this.CURRENT_PAGE_KEY,
        JSON.stringify(this.currentPage)
      );
    } catch (error) {
      console.error("Error saving current page to storage:", error);
    }
  }

  private loadFiltersFromURL(): void {
    try {
      const urlParams = new URLSearchParams(window.location.search);

      const dealersParam = urlParams.get("dealers");
      if (dealersParam) {
        const dealers = dealersParam
          .split(",")
          .filter((id) => id.trim() !== "");
        this.filters.dealers = dealers;
      }

      const sortParam = urlParams.get("sort");
      if (
        sortParam &&
        (sortParam === "asc" || sortParam === "des" || sortParam === "init")
      ) {
        this.filters.sort = sortParam;
      }
    } catch (error) {
      console.error("Error loading filters from URL:", error);
    }
  }

  private saveFiltersToURL(): void {
    try {
      const urlParams = new URLSearchParams(window.location.search);

      if (this.filters.dealers.length > 0) {
        urlParams.set("dealers", this.filters.dealers.join(","));
      } else {
        urlParams.delete("dealers");
      }

      if (this.filters.sort !== "init") {
        urlParams.set("sort", this.filters.sort);
      } else {
        urlParams.delete("sort");
      }

      const newURL =
        window.location.href +
        (urlParams.toString() ? "?" + urlParams.toString() : "");
      window.history.replaceState({}, "", newURL);
    } catch (error) {
      console.error("Error saving filters to URL:", error);
    }
  }

  async getGoods(dealers?: Dealer[]) {
    this.goods = await getGoodsRequest(dealers);
  }

  async getDealers() {
    this.dealers = await getDealersRequest();
  }

  setDealersFromConfig(dealers: Dealer[]) {
    this.configDealers = dealers;
  }

  async initializeStore() {
    await this.getDealers();
    await this.getGoods(this.configDealers);
    await this.getFilteredGoods(this.filters.dealers);
  }

  async getFilteredGoods(dealers?: Dealer[]) {
    this.filteredGoods = await getGoodsRequest(dealers);
  }

  setCurrentPage(page: Page) {
    this.currentPage = page;
    this.saveCurrentPageToStorage();
  }

  setCart(cart: CartItem[]) {
    this.cart = cart;
  }

  setSort(sort: Filters["sort"]) {
    this.filters.sort = sort;
    this.saveFiltersToURL();
  }

  setFilter(dealers: Filters["dealers"]) {
    this.filters.dealers = dealers;
    this.saveFiltersToURL();
  }

  addToCart(product: Product) {
    this.cart.push({ ...product, count: 1 });
    this.saveCartToStorage();
  }

  removeFromCart(id: string) {
    this.cart = this.cart.filter((el) => el.id !== id);
    this.saveCartToStorage();
  }

  clearCart() {
    this.cart = [];
    this.clearCartFromStorage();
  }

  setItemAmount(id: string, amount: number) {
    const idx = this.cart.findIndex((el) => el.id === id);

    if (idx !== -1) {
      if (amount === 0) {
        this.removeFromCart(id);
      } else {
        this.cart[idx].count = amount;
        this.saveCartToStorage();
      }
    }
  }

  get sortedGoods(): Product[] {
    const sortedGoods = [...this.filteredGoods];
    switch (this.filters.sort) {
      case "asc": {
        return sortedGoods.sort((a, b) => a.price - b.price);
      }
      case "des": {
        return sortedGoods.sort((a, b) => b.price - a.price);
      }
      default: {
        return sortedGoods;
      }
    }
  }

  get timeToExpire() {
    const expiryData = localStorage.getItem(this.CART_EXPIRY_KEY);
    const expiryTime = Number(expiryData || 0);
    const currentTime = Date.now();
    return expiryTime - currentTime;
  }

  get getItemAmount() {
    return (id: string) => this.cart?.find((el) => el.id === id)?.count || 0;
  }

  get isInCart() {
    return (id: string) => !!this.cart.find((el) => el.id === id);
  }

  get cartTotalPrice() {
    return this.cart.reduce(
      (acc, el) => acc + el.price * this.getItemAmount(el.id),
      0
    );
  }
}

const store = new Goods();

export { store };
