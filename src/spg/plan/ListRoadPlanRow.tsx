import { Button, Icon, View } from "@src/libs";
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
        spg.checkin && spg.visitTemp.id_road_plan == item.id ? (
          <Button
            style={{
              padding: 10,
              backgroundColor: "#4c8dff",
              paddingLeft: 20,
              borderRadius: 0
            }}
            onPress={async () => {
              spg.selectedPlan = item;
              nav.navigate("spg/plan/DetailRoadPlan");
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
                    fontSize: 20,
                    color: "#fff",
                    fontWeight: "500"
                  }}
                >
                  {item.outlet}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#ebebeb"
                  }}
                >
                  {item.time}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  margin: 10
                }}
              >
                <Icon
                  source={"Ionicons"}
                  name={"md-clipboard"}
                  size={26}
                  color={"#fff"}
                ></Icon>
              </View>
            </View>
          </Button>
        ) : (
          <Button
            style={{
              padding: 10,
              backgroundColor: "#ffffff",
              paddingLeft: 20
            }}
            onPress={async () => {
              spg.selectedPlan = item;
              nav.navigate("spg/plan/DetailRoadPlan");
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
                    color: "#3a3a3a",
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
                  {item.time}
                </Text>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  margin: 10
                }}
              >
                {item.status == "Visited" ? (
                  <Icon
                    source={"Ionicons"}
                    name={"md-checkmark-circle-outline"}
                    size={28}
                    color={"#7ed321"}
                  ></Icon>
                ) : (
                  <View>
                    {item.status == "Progress" ? (
                      <Icon
                        source={"Ionicons"}
                        name={"md-clipboard"}
                        size={26}
                        color={"#4c8dff"}
                      ></Icon>
                    ) : (
                      <Icon
                        source={"Entypo"}
                        name={"circular-graph"}
                        size={24}
                        color={"#f5a623"}
                      ></Icon>
                    )}
                  </View>
                )}
              </View>
            </View>
          </Button>
        )
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
