import Search from "@src/components/Search";
import { Button, Icon, View } from "@src/libs";
import ListEvent from "@src/spg/event/ListEvent";
import ListRoadPlan from "@src/spg/plan/ListRoadPlan";
import ListReport from "@src/spg/report/ListReport";
import spg from "@src/stores/spg";
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
  return (
    <View
      type={"SafeAreaView"}
      style={{
        flexShrink: 1,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
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
        {meta.menu == "plan" ? (
          <ListRoadPlan></ListRoadPlan>
        ) : meta.menu == "event" ? (
          <ListEvent></ListEvent>
        ) : (
          <ListReport></ListReport>
        )}
        {meta.menu !== "event" && (
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
              if (meta.menu == "plan") {
                nav.navigate("spg/plan/FormRoadPlan");
              } else if (meta.menu == "report") {
                spg.selectedReport = null;
                nav.navigate("spg/report/FormReport");
              }
            }}
          >
            <Icon
              source={"AntDesign"}
              name={"plus"}
              size={25}
              color={"#fff"}
            ></Icon>
          </Button>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderStyle: "solid",
          borderColor: "#e4e4e4"
        }}
      >
        <Button
          style={{
            backgroundColor: "transparent",
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => (meta.menu = "plan")}
        >
          <Icon
            source={"Ionicons"}
            name={"ios-walk"}
            size={28}
            style={{
              marginRight: 15,
              marginLeft: 15
            }}
            color={meta.menu == "plan" ? "#4c8dff" : "#59595c"}
          ></Icon>
          <View>
            {meta.menu == "plan" && (
              <Text
                style={{
                  color: "#818181",
                  fontSize: 12
                }}
              >
                Your
              </Text>
            )}
            <Text
              style={{
                fontSize: 16,
                color: meta.menu == "plan" ? "#4c8dff" : "#59595c"
              }}
            >
              Road Plan
            </Text>
          </View>
        </Button>
        <Button
          style={{
            backgroundColor: "transparent",
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => (meta.menu = "event")}
        >
          <Icon
            source={"Ionicons"}
            name={"ios-calendar"}
            size={28}
            style={{
              marginRight: 15,
              marginLeft: 15
            }}
            color={meta.menu == "event" ? "#4c8dff" : "#59595c"}
          ></Icon>
          <View>
            {meta.menu == "event" && (
              <Text
                style={{
                  color: "#818181",
                  fontSize: 12
                }}
              >
                Your
              </Text>
            )}
            <Text
              style={{
                fontSize: 16,
                color: meta.menu == "event" ? "#4c8dff" : "#59595c"
              }}
            >
              Event
            </Text>
          </View>
        </Button>
        <Button
          style={{
            backgroundColor: "transparent",
            paddingTop: 5,
            paddingBottom: 5,
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => (meta.menu = "report")}
        >
          <Icon
            source={"Ionicons"}
            name={"ios-clipboard"}
            size={28}
            style={{
              marginRight: 15,
              marginLeft: 15
            }}
            color={meta.menu == "report" ? "#4c8dff" : "#59595c"}
          ></Icon>
          <View>
            {meta.menu == "report" && (
              <Text
                style={{
                  color: "#818181",
                  fontSize: 12
                }}
              >
                Your
              </Text>
            )}
            <Text
              style={{
                fontSize: 16,
                color: meta.menu == "report" ? "#4c8dff" : "#59595c"
              }}
            >
              Report
            </Text>
          </View>
        </Button>
      </View>
    </View>
  );
});
