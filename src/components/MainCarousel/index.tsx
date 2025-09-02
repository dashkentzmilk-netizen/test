import { Carousel } from "antd";
import styles from "./style.module.scss";

import { ProductCard } from "../ProductCard";

import { store } from "../../store/store";
import { observer } from "mobx-react-lite";

const responsive = [
  {
    breakpoint: 1100,
    settings: {
      slidesToShow: 4,
    },
  },
  {
    breakpoint: 940,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 710,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

const MainCarousel = observer(() => {
  const { goods } = store;

  const getDataToShow = () => {
    const filteredData = goods?.filter((el) => el.price > 10);

    if (filteredData.length < 5) {
      return goods.slice(0, 7);
    }

    return filteredData;
  };

  const data = getDataToShow();

  return (
    <Carousel
      infinite
      slidesToShow={data.length > 5 ? 5 : data.length}
      slidesToScroll={1}
      draggable
      className={styles.carousel}
      responsive={responsive}
    >
      {getDataToShow().map((el) => (
        <ProductCard
          key={el.id}
          name={el.name}
          cost={el.price}
          image={el.image}
          id={el.id}
        />
      ))}
    </Carousel>
  );
});

export { MainCarousel };
