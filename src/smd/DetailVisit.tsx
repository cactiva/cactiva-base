import { Icon, Image, View, Carousel, dateToLocal } from "@src/libs";
import images from "@src/stores/images";
import smd from "@src/stores/smd";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});

  const visit = smd.visit.find(x => x.id_road_plan == smd.selectedPlan.id);

  if (!visit) return <View />;

  return (
    <View
      style={{
        flexShrink: 1
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15
        }}
      >
        Detil Kunjungan
      </Text>
      <View
        style={{
          marginBottom: 10
        }}
      >
        <Carousel
          data={["foto_display", "foto_kompetitor"]}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  position: "relative",
                  overflow: "hidden",
                  flex: 1
                }}
              >
                <Image
                  source={{
                    uri: `data:image/jpg;base64,${images[visit[item]]}`
                  }}
                  resizeMode={"cover"}
                  style={{
                    height: 300,
                    width: dim.width * 0.8,
                    flexGrow: 1,
                    flexShrink: 1,
                    flexBasis: 0,
                    borderRadius: 12
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    flex: 1,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    padding: 10,
                    flexGrow: 1
                  }}
                >
                  <Text
                    style={{
                      color: "#333"
                    }}
                  >
                    {item.replace("_", " ").toUpperCase()}
                  </Text>
                </View>
              </View>
            );
          }}
          itemWidth={dim.width - 0.8}
          sliderWidth={dim.width - 20}
          layout={"stack"}
          layoutCardOffset={18}
          loop
        ></Carousel>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: 15
        }}
      >
        <Text
          style={{
            marginLeft: 10
          }}
        >
          Visit pada {dateToLocal(visit.date)}
        </Text>
        <Icon
          source={"Entypo"}
          name={"fingerprint"}
          size={18}
          color={"#505052"}
          style={{
            marginRight: 5
          }}
        ></Icon>
        <Text
          style={{
            color: "#575757",
            fontSize: 14,
            marginRight: 10
          }}
        >
          {visit.checkin.getHours()}.{visit.checkin.getMinutes()}
        </Text>
        <Icon
          source={"Ionicons"}
          name={"md-checkmark-circle-outline"}
          size={18}
          style={{
            marginRight: 5
          }}
          color={"#505052"}
        ></Icon>
        <Text
          style={{
            fontSize: 14,
            color: "#575757"
          }}
        >
          {visit.checkin.getHours()}.{visit.checkin.getMinutes()}
        </Text>
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
          Temperatur :
        </Text>
        <Text
          style={{
            color: "#575757",
            textAlign: "justify",
            fontSize: 16
          }}
        >
          {visit.temperature}
        </Text>
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
          Kerusakan :
        </Text>
        <Text
          style={{
            color: "#575757",
            textAlign: "justify",
            fontSize: 16
          }}
        >
          {visit.kerusakan}
        </Text>
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
          Pengunjung :
        </Text>
        <Text
          style={{
            color: "#575757",
            textAlign: "justify",
            fontSize: 16
          }}
        >
          {visit.status_pengunjung}
        </Text>
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
          Status Display :
        </Text>
        <Text
          style={{
            color: "#575757",
            textAlign: "justify",
            fontSize: 16
          }}
        >
          {visit.status_display}
        </Text>
      </View>
      <View
        style={{
          marginBottom: 30
        }}
      >
        <Text
          style={{
            marginBottom: 5,
            fontSize: 16
          }}
        >
          Catatan :
        </Text>
        <Text
          style={{
            color: "#575757",
            textAlign: "justify",
            fontSize: 16
          }}
        >
          {visit.remarks}
        </Text>
      </View>
    </View>
  );
});
