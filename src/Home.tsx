import { observer } from "mobx-react-lite";
import React from "react";
import { Image, Text, View } from "react-native";
import { useDimensions } from "react-native-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: dim.height
      }}
    >
      <Image
        source={require("@src/assets/images/cactiva-logo.png")}
        style={{
          height: 80,
          width: 80,
          margin: 15
        }}
      />
      <Text
        style={{
          fontSize: 18,
          flexDirection: "column"
        }}
      >
        Welcome to Cactiva Base App!
      </Text>
    </View>
  );
});
