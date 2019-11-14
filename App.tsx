import { observer } from "mobx-react-lite";
import React from "react";
import { AppContainer } from "./src/libs/navigation";

const Container = AppContainer();
export default observer(() => {
  return (
    <Container
      style={{
        flex: 1
      }}
    />
  );
});
