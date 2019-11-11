import { Button, dateToLocal, Header, Icon, View } from "@src/libs";
import { getLocation } from "@src/libs/ui/Location";
import DetailVisit from "@src/spg/plan/DetailVisit";
import FormVisit from "@src/spg/plan/FormVisit";
import outlet from "@src/stores/outlet";
import smd from "@src/stores/smd";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import MapView from "@src/libs/ui/MapView";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});

  if (!smd.selectedPlan) return null;

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
      <Header title={smd.selectedPlan.outlet} leftAction={true}>
        {smd.selectedPlan.status != "Visited" &&
          (smd.checkin &&
            smd.visitTemp &&
            smd.visitTemp.id_road_plan == smd.selectedPlan.id ? (
              smd.visitTemp && (
                <Button
                  style={{
                    backgroundColor: "rgba(126,211,33,0.2)",
                    paddingTop: 5,
                    paddingBottom: 5
                  }}
                  onPress={async () => {
                    smd.selectedPlan.status = "Visited";
                    nav.goBack();
                    smd.visitTemp.checkout = new Date();
                    smd.visit.push(smd.visitTemp);
                    smd.visitTemp = null;
                    smd.checkin = false;
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
                  if (!smd.checkin) {
                    smd.checkin = true;
                    smd.visitTemp = {
                      id_road_plan: smd.selectedPlan.id,
                      id_outlet: outlet.list.find(
                        o => o.name == smd.selectedPlan.outlet
                      ).id,
                      date: new Date(),
                      checkin: new Date()
                    };
                    await getLocation()
                      .then(res => {
                        if (res) {
                          smd.visitTemp.lat = res.latitude;
                          smd.visitTemp.lon = res.longitude;
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
      {smd.checkin && smd.selectedPlan.id == smd.visitTemp.id_road_plan ? (
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
                {smd.selectedPlan.outlet}
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start"
                }}
              >
                <Text
                  style={{
                    color: "#575757",
                    fontSize: 14,
                    marginRight: 5
                  }}
                >
                  {dateToLocal(smd.selectedPlan.date)}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#575757"
                  }}
                >
                  {smd.selectedPlan.time}
                </Text>
              </View>
            </View>
            <MapView />
            {smd.selectedPlan.status == "Visited" && <DetailVisit></DetailVisit>}
          </View>
        )}
    </View>
  );
});
