import { Button, dateToLocal, Header, Icon, View } from "@src/libs";
import spg from "@src/stores/spg";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});
  const data = spg.selectedReport;

  useEffect(() => {
    if (!spg.selectedReport) {
      nav.navigate("spg/Main");
    }
  }, [spg.selectedReport]);

  return (
    <View
      type={"SafeAreaView"}
      style={{
        flexShrink: 1,
        padding: 10,
        display: "flex",
        flexGrow: 1,
        paddingBottom: 20
      }}
    >
      <Header title={data.outlet} leftAction={true}>
        <Button
          style={{
            backgroundColor: "rgba(76,141,255,0.2)",
            paddingTop: 5,
            paddingBottom: 5
          }}
          onPress={async () => {
            nav.navigate("spg/report/FormReport");
          }}
        >
          <Icon
            source={"AntDesign"}
            name={"edit"}
            size={24}
            color={"#4c8dff"}
          ></Icon>
        </Button>
      </Header>
      <View
        style={{
          padding: 10,
          flexShrink: 1
        }}
        type={"ScrollView"}
      >
        <View
          style={{
            marginBottom: 25
          }}
        >
          <Text
            style={{
              fontSize: 24,
              textAlign: "justify",
              fontWeight: "bold",
              color: "#3f3f3f",
              marginBottom: 5
            }}
          >
            {data.outlet}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Icon
              source={"Ionicons"}
              name={"md-calendar"}
              size={20}
              color={"#4c8dff"}
              style={{
                marginRight: 5
              }}
            ></Icon>
            <Text
              style={{
                color: "#575757",
                fontSize: 14,
                marginRight: 5
              }}
            >
              {dateToLocal(data.date)},
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#575757"
              }}
            >
              {data.time}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 15
          }}
        >
          <Text
            style={{
              marginBottom: 5,
              fontSize: 16
            }}
          >
            Feedback :
          </Text>
          <Text
            style={{
              color: "#575757",
              textAlign: "justify",
              fontSize: 16
            }}
          >
            {data.feedback}
          </Text>
        </View>
        <View
          style={{
            marginBottom: 15,
            backgroundColor: "rgba(76, 141, 255, 0.12)",
            borderRadius: 8,
            padding: 15
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontSize: 16,
              color: "#4c8dff"
            }}
          >
            Catatan.
          </Text>
          <Text
            style={{
              color: "#575757",
              textAlign: "justify",
              fontSize: 18
            }}
          >
            {data.remarks}
          </Text>
        </View>
      </View>
    </View>
  );
});
