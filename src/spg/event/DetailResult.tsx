import { Icon, Image, View, Carousel, dateToLocal } from "@src/libs";
import images from "@src/stores/images";
import spg from "@src/stores/spg";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});

  const result = spg.eventResult.find(x => x.id_event == spg.selectedEvent.id);

  if (!result) return <View />;

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
        Hasil
      </Text>
      <View
        style={{
          marginBottom: 10
        }}
      >
        <Carousel
          data={["foto_display"]}
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
                    uri: `data:image/jpg;base64,${images[result[item]]}`
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
          marginBottom: 15
        }}
      >
        <Text
          style={{
            marginBottom: 5,
            fontSize: 16
          }}
        >
          Produk :
        </Text>
        <Text
          style={{
            color: "#575757",
            textAlign: "justify",
            fontSize: 16
          }}
        >
          {result.produk} @{result.qty}
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
          Feedback :
        </Text>
        <Text
          style={{
            color: "#575757",
            textAlign: "justify",
            fontSize: 16
          }}
        >
          {result.feedback}
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
          {result.remarks}
        </Text>
      </View>
    </View>
  );
});
