import { Card, Flex, Radio, RadioChangeEvent, Tag } from "antd";
import styles from "./style.module.scss";
import { store } from "../../store/store";
import { observer } from "mobx-react-lite";
import Title from "antd/es/typography/Title";

const Price = observer(() => {
  const { dealers, filters } = store;

  const handleChange = (dealer: string, checked: boolean) => {
    const nextSelectedDealers = checked
      ? [...filters.dealers, dealer]
      : filters.dealers.filter((t) => t !== dealer);
    store.setFilter(nextSelectedDealers);
  };

  return (
    <Card className={styles.card}>
      <Flex vertical>
        <Title
          level={4}
          style={{ margin: "0 0 15px", textAlign: "center", color: "#1677ff" }}
        >
          Дилеры
        </Title>
        <Flex gap={4} className={styles.tags}>
          {dealers.map((el) => (
            <Tag.CheckableTag
              style={{ fontSize: "15px", width: "fit-content", padding: "5px" }}
              key={el}
              checked={filters.dealers.includes(el)}
              onChange={(checked) => handleChange(el, checked)}
              className={styles.filter}
            >
              {el}
            </Tag.CheckableTag>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
});

const RADIO_BUTTONS = [
  { title: "Не активно", value: "init" },
  { title: "По возрастанию", value: "asc" },
  { title: " По убыванию", value: "des" },
];

const Sort = observer(() => {
  const handleChangeSort = (e: RadioChangeEvent) => {
    store.setSort(e.target.value);
  };

  return (
    <Card className={styles.card}>
      <Flex vertical>
        <Title
          level={4}
          style={{ margin: "0 0 15px", textAlign: "center", color: "#1677ff" }}
        >
          Стоимость
        </Title>
        <Radio.Group
          defaultValue={store.filters.sort}
          size="large"
          className={styles.radio}
        >
          {RADIO_BUTTONS.map((el) => (
            <Radio.Button
              key={el.value}
              value={el.value}
              onChange={handleChangeSort}
              className={styles.radioItem}
            >
              {el.title}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Flex>
    </Card>
  );
});

const Filters = () => {
  return (
    <Flex
      gap={16}
      wrap="wrap"
      justify="space-between"
      className={styles.filters}
    >
      <Price />
      <Sort />
    </Flex>
  );
};

export { Filters };
