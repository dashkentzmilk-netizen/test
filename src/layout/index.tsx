import {
  BookOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Flex, Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { store } from "../store/store";
import { observer } from "mobx-react-lite";
import { Page } from "../types";

const menuItems = [
  {
    key: "main",
    label: "Главная",
    icon: <HomeOutlined />,
  },
  {
    key: "catalog",
    label: "Каталог",
    icon: <BookOutlined />,
  },
  {
    key: "cart",
    label: "Корзина",
    icon: <ShoppingCartOutlined />,
  },
];

export const PageLayout = observer(
  ({ children }: { children: React.ReactNode }) => {
    const { expiryTime } = store;

    useEffect(() => {
      let timeout: NodeJS.Timeout;
      if (expiryTime) {
        timeout = setTimeout(() => store.clearCart(), store.timeToExpire);
      }
      return () => clearTimeout(timeout);
    }, [expiryTime]);

    const handleMenuClick = ({ key }: { key: string }) => {
      store.setCurrentPage(key as Page);
    };

    return (
      <Layout className={styles.layout} style={{ height: "100%" }}>
        <Flex vertical className={styles.layout}>
          <Header className={styles.header}>
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[store.currentPage]}
              className={styles.menu}
              onClick={handleMenuClick}
              items={menuItems}
            />
          </Header>
          <Content className={styles.content}>
            <div className={styles.children}>{children}</div>
          </Content>
        </Flex>
      </Layout>
    );
  }
);
