import styles from "./style.module.scss";
import { ProductCard } from "../ProductCard";
import { useEffect } from "react";
import { store } from "../../store/store";
import { observer } from "mobx-react-lite";

const Catalog = observer(() => {
  const { sortedGoods, filters } = store;

  useEffect(() => {
    store.getFilteredGoods(filters.dealers);
  }, [filters.dealers]);

  return (
    <div className={styles.catalog}>
      {sortedGoods.map((el) => (
        <ProductCard
          key={el.id}
          name={el.name}
          image={el.image}
          cost={el.price}
          id={el.id}
        />
      ))}
    </div>
  );
});

export { Catalog };
