import { DeleteOutlined } from "@ant-design/icons";
import { Flex, Button, Divider, Avatar, List } from "antd";
import { store } from "../../store/store";
import { observer } from "mobx-react-lite";
import { Counter } from "../Counter";
import styles from "./style.module.scss";
import { BASE_URL } from "../../api";

const ListItem = observer(
  ({
    item,
  }: {
    item: {
      name: string;
      price: number;
      image: string;
      count?: number;
      id: string;
    };
  }) => {
    return (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`${BASE_URL}/${item.image}`} />}
          title={item.name}
          description={item.price + " ₽"}
        />
        <Flex gap={12}>
          <Counter
            count={store.getItemAmount(item.id)}
            setCounter={(amount: number) => {
              store.setItemAmount(item.id, amount);
            }}
          />
          <Button
            size="large"
            icon={<DeleteOutlined />}
            danger
            onClick={() => store.removeFromCart(item.id || "")}
          />
        </Flex>
      </List.Item>
    );
  }
);

const CartList = observer(() => {
  const { cart } = store;

  return (
    <List
      itemLayout="horizontal"
      dataSource={cart}
      locale={{ emptyText: "Корзина пустая" }}
      renderItem={(item) => <ListItem item={item} />}
    />
  );
});

export const Cart = observer(() => {
  const sum = Math.floor(store.cartTotalPrice * 100) / 100;
  return (
    <Flex vertical>
      {store.cart.length > 0 && (
        <Button
          size="large"
          icon={<DeleteOutlined />}
          type="primary"
          danger
          style={{ maxWidth: "200px", alignSelf: "flex-end" }}
          onClick={() => store.clearCart()}
        >
          Удалить все товары
        </Button>
      )}
      <CartList />
      {store.cart.length > 0 && (
        <>
          <Divider orientation="right" style={{ borderColor: "#20a6ffff" }}>
            Итого
          </Divider>
          <div className={styles.sum}>{sum} ₽</div>
        </>
      )}
    </Flex>
  );
});
