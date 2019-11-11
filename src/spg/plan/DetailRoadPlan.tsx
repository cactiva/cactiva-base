import { Button, dateToLocal, Header, Icon, View } from "@src/libs";
import { getLocation } from "@src/libs/ui/Location";
import DetailVisit from "@src/spg/plan/DetailVisit";
import FormVisit from "@src/spg/plan/FormVisit";
import outlet from "@src/stores/outlet";
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

  useEffect(() => {
    if (!spg.selectedPlan) {
      nav.navigate("spg/Main");
    }
  }, [spg.selectedPlan]);

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
      <Header title={spg.selectedPlan.outlet} leftAction={true}>
        {spg.selectedPlan.status != "Visited" &&
          (spg.checkin &&
          spg.visitTemp &&
          spg.visitTemp.id_road_plan == spg.selectedPlan.id ? (
            spg.visitTemp && (
              <Button
                style={{
                  backgroundColor: "rgba(126,211,33,0.2)",
                  paddingTop: 5,
                  paddingBottom: 5
                }}
                onPress={async () => {
                  spg.selectedPlan.status = "Visited";
                  nav.goBack();
                  spg.visitTemp.checkout = new Date();
                  spg.visit.push(spg.visitTemp);
                  spg.visitTemp = null;
                  spg.checkin = false;
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
                if (!spg.checkin) {
                  spg.checkin = true;
                  spg.visitTemp = {
                    id_road_plan: spg.selectedPlan.id,
                    id_outlet: outlet.list.find(
                      o => o.name == spg.selectedPlan.outlet
                    ).id,
                    date: new Date(),
                    checkin: new Date()
                  };
                  await getLocation()
                    .then(res => {
                      if (res) {
                        spg.visitTemp.lat = res.latitude;
                        spg.visitTemp.lon = res.longitude;
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
      {spg.checkin && spg.selectedPlan.id == spg.visitTemp.id_road_plan ? (
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
              {spg.selectedPlan.outlet}
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
                {dateToLocal(spg.selectedPlan.date)},
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#575757"
                }}
              >
                {spg.selectedPlan.time}
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
              {spg.selectedPlan.remarks}
            </Text>
          </View>
          {spg.selectedPlan.status == "Visited" && <DetailVisit></DetailVisit>}
        </View>
      )}
    </View>
  );
});
