import { Button, dateToLocal, Header, Icon, View } from "@src/libs";
import { getLocation } from "@src/libs/ui/Location";
import DetailVisit from "@src/sales/DetailVisit";
import FormVisit from "@src/sales/FormVisit";
import outlet from "@src/stores/outlet";
import sales from "@src/stores/sales";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});

  
  if (!sales.selectedPlan) return null;

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
      <Header title={sales.selectedPlan.outlet} leftAction={true}>
        {sales.selectedPlan.status != "Visited" &&
          (sales.checkin &&
          sales.visitTemp &&
          sales.visitTemp.id_road_plan == sales.selectedPlan.id ? (
            sales.visitTemp && (
              <Button
                style={{
                  backgroundColor: "rgba(126,211,33,0.2)",
                  paddingTop: 5,
                  paddingBottom: 5
                }}
                onPress={async () => {
                  sales.selectedPlan.status = "Visited";
                  nav.goBack();
                  sales.visitTemp.checkout = new Date();
                  sales.visit.push(sales.visitTemp);
                  sales.visitTemp = null;
                  sales.checkin = false;
                }}
              >
                <Icon
                  source={"Ionicons"}
                  name={"md-checkmark-circle-outline"}
                  size={28}
                  color={"#7ed321"}
                ></Icon>
              </Button>
            )
          ) : (
            <Button
              style={{
                backgroundColor: "rgba(76,141,255,0.18)",
                paddingTop: 5,
                paddingBottom: 5
              }}
              onPress={async () => {
                if (!sales.checkin) {
                  sales.checkin = true;
                  sales.visitTemp = {
                    id_road_plan: sales.selectedPlan.id,
                    id_outlet: outlet.list.find(
                      o => o.name == sales.selectedPlan.outlet
                    ).id,
                    date: new Date(),
                    checkin: new Date()
                  };
                  await getLocation()
                    .then(res => {
                      if (res) {
                        sales.visitTemp.lat = res.latitude;
                        sales.visitTemp.lon = res.longitude;
                      }
                    })
                    .catch(e => console.log(e));
                } else {
                  alert(
                    "Checkin gagal. Mohon selesaikan checkin anda sebelumnya."
                  );
                }
              }}
            >
              <Icon
                source={"Ionicons"}
                name={"ios-finger-print"}
                size={28}
                color={"#4c8dff"}
              ></Icon>
            </Button>
          ))}
      </Header>
      {sales.checkin &&
      sales.selectedPlan.id == sales.visitTemp.id_road_plan ? (
        <FormVisit></FormVisit>
      ) : (
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
              {sales.selectedPlan.outlet}
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
                {dateToLocal(sales.selectedPlan.date)},
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#575757"
                }}
              >
                {sales.selectedPlan.time}
              </Text>
            </View>
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
              {sales.selectedPlan.remarks}
            </Text>
          </View>
          {sales.selectedPlan.status == "Visited" && (
            <DetailVisit></DetailVisit>
          )}
        </View>
      )}
    </View>
  );
});
