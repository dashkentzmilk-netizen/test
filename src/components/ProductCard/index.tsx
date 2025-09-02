import {
  LeftOutlined,
  RightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import styles from "./style.module.scss";
import { store } from "../../store/store";
import { BASE_URL } from "../../api";
import { observer } from "mobx-react-lite";

export const ProductCard = observer(
  ({
    name,
    image,
    cost,
    id,
  }: {
    name: string;
    image: string;
    cost: number;
    id: string;
  }) => {
    const amount = store.getItemAmount(id);
    return (
      <>
        {store.isInCart(id) ? (
          <Card
            hoverable
            cover={<img alt={name} src={`${BASE_URL}/${image}`} />}
            className={styles.card}
            actions={[
              <LeftOutlined
                onClick={() => store.setItemAmount(id, amount - 1)}
              />,
              <div>{amount}</div>,
              <RightOutlined
                onClick={() => store.setItemAmount(id, amount + 1)}
              />,
            ]}
          >
            <Flex vertical gap={16}>
              <Flex justify="space-between">
                <Meta title={name} />
                <Meta description={`${cost} ₽`} />
              </Flex>
            </Flex>
          </Card>
        ) : (
          <Card
            hoverable
            cover={<img alt={name} src={`${BASE_URL}/${image}`} />}
            className={styles.card}
            actions={[
              <ShoppingCartOutlined
                key="addToCart"
                onClick={() =>
                  store.addToCart({ id, name, image, price: cost })
                }
              />,
            ]}
          >
            <Flex vertical gap={16}>
              <Flex justify="space-between" align="center">
                <Meta title={name} />
                <Meta description={`${cost} ₽`} />
              </Flex>
            </Flex>
          </Card>
        )}
      </>
    );
  }
);
