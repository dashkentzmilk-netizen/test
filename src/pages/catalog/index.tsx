import { Flex } from "antd";
import { Catalog } from "../../components/Catalog";
import { Filters } from "../../components/Filters";

const CatalogPage = () => {
  return (
    <Flex vertical gap={32}>
      <Filters />
      <Catalog />
    </Flex>
  );
};

export { CatalogPage };
