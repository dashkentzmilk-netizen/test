import React from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";
import Widget from "./Widget";
import { store } from "./store/store";
import { Dealer } from "./types";

interface WidgetConfig {
  el: string;
  dealers?: Dealer[];
}

export class WidgetCatalog {
  private config: WidgetConfig;
  private container: HTMLElement | null = null;
  private root: any = null;

  constructor(config: WidgetConfig) {
    this.config = config;
  }

  async run(): Promise<void> {
    try {
      this.container = document.querySelector(this.config.el);
      if (!this.container) {
        throw new Error(`Container ${this.config.el} not found`);
      }

      if (this.config.dealers && this.config.dealers.length > 0) {
        const dealers = this.config.dealers.map((id) => id);
        store.setDealersFromConfig(dealers);
      }

      await store.initializeStore();

      this.root = createRoot(this.container);
      this.root.render(
        React.createElement(
          ConfigProvider,
          { locale: ruRU },
          React.createElement(Widget)
        )
      );
    } catch (error) {
      console.error("Error initializing widget:", error);
      this.showError();
    }
  }

  private showError(): void {
    if (this.container) {
      this.container.innerHTML = `
        <div style="
          padding: 20px;
          text-align: center;
          color: #ff4d4f;
          border: 1px solid #ffccc7;
          border-radius: 6px;
          background-color: #fff2f0;
        ">
          <h3>Ошибка загрузки виджета</h3>
          <p>Не удалось инициализировать каталог товаров</p>
        </div>
      `;
    }
  }

  destroy(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    this.container = null;
  }
}

export default WidgetCatalog;
