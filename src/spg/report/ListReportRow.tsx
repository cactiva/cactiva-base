import { Button, Icon, View, dateToLocal } from "@src/libs";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import spg from "@src/stores/spg";

export default observer(({ item, index }: any) => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});
  return (
    <View>
      {!item.header ? (
        <Button
          style={{
            padding: 10,
            paddingLeft: 20,
            borderRadius: 0,
            backgroundColor: "#fff"
          }}
          onPress={async () => {
            spg.selectedReport = item;
            nav.navigate("spg/report/DetailReport");
          }}
        >
          <View
            style={{
              borderRadius: 5,
              backgroundColor: "",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexGrow: 1
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start"
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#333",
                  fontWeight: "500"
                }}
              >
                {item.outlet}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#8a8a8a"
                }}
              >
                {dateToLocal(item.date)}
              </Text>
            </View>
          </View>
        </Button>
      ) : (
        <View
          style={{
            padding: 10,
            backgroundColor: "#f7faff",
            alignItems: "flex-start",
            justifyContent: "center",
            borderRadius: 0
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#333333",
              fontWeight: "bold"
            }}
          >
            {item.date}
          </Text>
        </View>
      )}
    </View>
  );
});
