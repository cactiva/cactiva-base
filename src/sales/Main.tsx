import Search from "@src/components/Search";
import { Button, FlatList, Icon, uuid, View } from "@src/libs";
import ListRoadPlanRow from "@src/spg/plan/ListRoadPlanRow";
import sales from "@src/stores/sales";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({
    search: "",
    menu: "plan"
  });
  const styleIconAct = {
    marginRight: 15,
    marginLeft: 15
  };
  const styleButtonAct = {
    flexGrow: 1
  };
  const styleButton = {
    alignItems: "center",
    justifyContent: "center"
  };
  return (
    <View
      type={"SafeAreaView"}
      style={{
        flexShrink: 1,
        display: "flex",
        flexGrow: 1
      }}
    >
      <View
        style={{
          padding: 10,
          minWidth: 40,
          backgroundColor: "",
          flexShrink: 1,
          display: "flex",
          flexGrow: 1
        }}
        type={"View"}
      >
        <View
          style={{
            marginTop: 0,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "stretch"
          }}
        >
          <Search state={meta}></Search>
          <Button
            style={{
              backgroundColor: "rgba(245,166,35,0.14)"
            }}
            onPress={async () => {
              nav.navigate("Login");
            }}
          >
            <Icon
              source={"AntDesign"}
              name={"logout"}
              size={20}
              color={"#f5a623"}
            ></Icon>
          </Button>
        </View>
        <View
          style={{
            flexShrink: 1
          }}
          type={"View"}
        >
          <FlatList
            data={sales.roadplan}
            renderItem={({ item, index }: any) => {
              return (
                <View>
                  <ListRoadPlanRow item={item} index={index}></ListRoadPlanRow>
                </View>
              );
            }}
            stickyHeaderIndices={sales.roadplan.map((item, idx) => {
              if (item.header) return idx;
            })}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: "#f0f0f0",
                    borderStyle: "solid"
                  }}
                />
              );
            }}
            keyExtractor={(_: any, index: number) => {
              return uuid(index + "-");
            }}
            style={{
              paddingBottom: 25
            }}
          ></FlatList>
        </View>
        <Button
          style={{
            minWidth: 50,
            minHeight: 50,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            position: "absolute",
            bottom: 20,
            right: 20,
            alignSelf: "flex-start"
          }}
          shadow={true}
          onPress={async () => {
            nav.navigate("sales/FormRoadPlan");
          }}
        >
          <Icon
            source={"AntDesign"}
            name={"plus"}
            size={25}
            color={"#fff"}
          ></Icon>
        </Button>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          borderColor: "#f0f0f0",
          borderStyle: "solid"
        }}
      >
        <Button
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            display: "flex",
            paddingTop: 5,
            paddingBottom: 5,
            ...((meta.menu == "plan" ? styleButtonAct : styleButton) as any)
          }}
          onPress={() => {
            return (meta.menu = "plan");
          }}
        >
          <Icon
            source={"Ionicons"}
            name={"ios-walk"}
            size={34}
            style={meta.menu == "plan" ? styleIconAct : {}}
            color={meta.menu == "plan" ? "#4c8dff" : "#59595c"}
          ></Icon>
          {meta.menu == "plan" && (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: "#4c8dff"
                }}
              >
                Road Plan
              </Text>
            </View>
          )}
        </Button>
        <Button
          style={{
            backgroundColor: "transparent",
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            flexDirection: "row",
            ...((meta.menu == "po" ? styleButtonAct : styleButton) as any)
          }}
          onPress={() => {
            return (meta.menu = "po");
          }}
        >
          <Icon
            source={"Ionicons"}
            name={"ios-cart"}
            size={28}
            style={meta.menu == "po" ? styleIconAct : {}}
            color={meta.menu == "po" ? "#4c8dff" : "#59595c"}
          ></Icon>
          {meta.menu == "po" && (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: "#4c8dff"
                }}
              >
                Purchase Order
              </Text>
            </View>
          )}
        </Button>
        <Button
          style={{
            backgroundColor: "transparent",
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            flexDirection: "row",
            ...((meta.menu == "kontrak" ? styleButtonAct : styleButton) as any)
          }}
          onPress={() => {
            return (meta.menu = "kontrak");
          }}
        >
          <Icon
            source={"Ionicons"}
            name={"ios-archive"}
            size={28}
            style={meta.menu == "kontrak" ? styleIconAct : {}}
            color={meta.menu == "kontrak" ? "#4c8dff" : "#59595c"}
          ></Icon>
          {meta.menu == "kontrak" && (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: "#4c8dff"
                }}
              >
                Kontrak
              </Text>
            </View>
          )}
        </Button>
        <Button
          style={{
            backgroundColor: "transparent",
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            flexDirection: "row",
            ...((meta.menu == "event" ? styleButtonAct : styleButton) as any)
          }}
          onPress={() => {
            return (meta.menu = "event");
          }}
        >
          <Icon
            source={"Ionicons"}
            name={"ios-calendar"}
            size={28}
            style={meta.menu == "event" ? styleIconAct : {}}
            color={meta.menu == "event" ? "#4c8dff" : "#59595c"}
          ></Icon>
          {meta.menu == "event" && (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: "#4c8dff"
                }}
              >
                Report Event
              </Text>
            </View>
          )}
        </Button>
        <Button
          style={{
            backgroundColor: "transparent",
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            flexDirection: "row",
            ...((meta.menu == "outlet" ? styleButtonAct : styleButton) as any)
          }}
          onPress={() => {
            return (meta.menu = "outlet");
          }}
        >
          <Icon
            source={"Ionicons"}
            name={"ios-business"}
            size={28}
            style={meta.menu == "outlet" ? styleIconAct : {}}
            color={meta.menu == "outlet" ? "#4c8dff" : "#59595c"}
          ></Icon>
          {meta.menu == "outlet" && (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: "#4c8dff"
                }}
              >
                Report Outlet
              </Text>
            </View>
          )}
        </Button>
      </View>
    </View>
  );
});
