import { FlatList, uuid, View } from "@src/libs";
import spg from "@src/stores/spg";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import ListEventRow from "./ListEventRow";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({});

  return (
    <View
      style={{
        flexShrink: 1
      }}
      type={"View"}
    >
      <FlatList
        data={spg.event}
        renderItem={({ item, index }: any) => {
          return (
            <View>
              <ListEventRow item={item} index={index}></ListEventRow>
            </View>
          );
        }}
        stickyHeaderIndices={spg.roadplan.map((item, idx) => {
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
  );
});
