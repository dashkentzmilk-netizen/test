import React from "react";
import { observer } from "mobx-react-lite";
import { PageLayout } from "./layout";
import { store } from "./store/store";
import { MainPage } from "./pages/main";
import { CatalogPage } from "./pages/catalog";
import { CartPage } from "./pages/cart";
import "./global.css";

const PAGES = {
  main: <MainPage />,
  catalog: <CatalogPage />,
  cart: <CartPage />,
};

const Widget: React.FC = observer(() => {
  return (
    <div className="widget-catalog">
      <PageLayout>{PAGES[store.currentPage]}</PageLayout>
    </div>
  );
});

export default Widget;
