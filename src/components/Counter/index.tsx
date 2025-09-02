import { Button, Flex } from "antd";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

const Counter = observer(
  ({
    count,
    setCounter,
  }: {
    count: number;
    setCounter: (amount: number) => void;
  }) => {
    return (
      <Flex gap={10} align="center">
        <Button icon={<LeftOutlined />} onClick={() => setCounter(count - 1)} />
        {count}
        <Button
          icon={<RightOutlined />}
          onClick={() => setCounter(count + 1)}
        />
      </Flex>
    );
  }
);

export { Counter };
