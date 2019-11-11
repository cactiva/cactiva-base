import { Button, dateToLocal, Header, Icon, View, Text } from "@src/libs";
import { getLocation } from "@src/libs/ui/Location";
import spg from "@src/stores/spg";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import DetailResult from "./DetailResult";
import FormResult from "./FormResult";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});
  const data = spg.selectedEvent;
  const result = spg.resultTemp;

  useEffect(() => {
    if (!spg.selectedEvent) {
      nav.navigate("spg/Main");
    }
  }, [spg.selectedEvent]);

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
      <Header title={data.lokasi} leftAction={true}>
        {data.status != "Done" &&
          (spg.checkinEvent &&
          spg.resultTemp &&
          spg.resultTemp.id_event == data.id ? (
            result && (
              <Button
                style={{
                  backgroundColor: "rgba(126,211,33,0.2)",
                  paddingTop: 5,
                  paddingBottom: 5
                }}
                onPress={async () => {
                  data.status = "Done";
                  spg.selectedEvent = data;
                  nav.goBack();
                  result.checkout = new Date();
                  spg.eventResult.push(result);
                  spg.resultTemp = null;
                  spg.checkinEvent = false;
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
                if (!spg.checkinEvent) {
                  spg.checkinEvent = true;
                  spg.resultTemp = {
                    id_event: data.id,
                    lokasi: data.lokasi,
                    date: new Date(),
                    checkin: new Date()
                  };
                  await getLocation()
                    .then(res => {
                      if (res) {
                        spg.resultTemp.lat = res.latitude;
                        spg.resultTemp.lon = res.longitude;
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
                name={"ios-clipboard"}
                size={28}
                color={"#4c8dff"}
              ></Icon>
            </Button>
          ))}
      </Header>
      {spg.checkinEvent && data.id == result.id_event ? (
        <FormResult></FormResult>
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
              {data.lokasi}
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
                {dateToLocal(data.event_date)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Icon
                source={"Ionicons"}
                name={"md-person"}
                size={20}
                color={"#4c8dff"}
                style={{
                  marginRight: 5
                }}
              ></Icon>
              <Text
                style={{
                  fontSize: 14,
                  color: "#575757"
                }}
              >
                {data.contact_person_name}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginBottom: 15,
              backgroundColor: "rgba(126,211,33,0.06)",
              borderRadius: 8,
              padding: 15
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontSize: 16,
                color: "#7ed321ff"
              }}
            >
              Target.
            </Text>
            <Text
              style={{
                color: "#575757",
                textAlign: "justify",
                fontSize: 18
              }}
            >
              {data.target}
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
          {data.status == "Done" && <DetailResult></DetailResult>}
        </View>
      )}
    </View>
  );
});
