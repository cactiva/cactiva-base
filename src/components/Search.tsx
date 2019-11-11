import { Icon, Input, View } from "@src/libs";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(({ state }: any) => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});

  return (
    <View
      type={"View"}
      style={{
        borderColor: "#f0f0f0",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        backgroundColor: "#fbfbfb",
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: "row",
        alignItems: "center",
        flexGrow: 1,
        marginRight: 10,
        justifyContent: "flex-start"
      }}
    >
      <Icon
        source={"AntDesign"}
        name={"search1"}
        size={20}
        style={{
          marginRight: 8
        }}
        color={"#818181"}
      ></Icon>
      <Input
        placeholder={"Cari Road Plan..."}
        fieldType={"input"}
        type={"text"}
        style={{
          flexGrow: 1
        }}
        value={state.search}
        onChangeText={value => {
          state.search = value;
        }}
      ></Input>
    </View>
  );
});
