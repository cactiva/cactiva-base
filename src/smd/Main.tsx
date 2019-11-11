import Search from "@src/components/Search";
import { Button, FlatList, Icon, ImageBackground, uuid, View } from "@src/libs";
import ListRoadPlanRow from "@src/smd/ListRoadPlanRow";
import smd from "@src/stores/smd";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({
    search: ""
  });
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
            data={smd.roadplan}
            renderItem={({ item, index }: any) => {
              return (
                <View>
                  <ListRoadPlanRow item={item} index={index}></ListRoadPlanRow>
                </View>
              );
            }}
            stickyHeaderIndices={smd.roadplan.map((item, idx) => {
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
            nav.navigate("smd/FormRoadPlan");
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
    </View>
  );
});
