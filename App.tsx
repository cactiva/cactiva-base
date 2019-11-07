import CactivaForm from "@src/CactivaForm";
import { observer } from "mobx-react-lite";
import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { AppContainer } from "./src/libs/navigation";
const StackNav = createStackNavigator(
  {
    // Home,
    CactivaForm
  },
  {
    headerMode: "none"
  }
);
export const Container = AppContainer(StackNav);

export default observer(() => {
  return (
    <Container
      style={{
        flex: 1
      }}
    />
  );
});
