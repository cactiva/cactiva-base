import {
  Button,
  DatePicker,
  Field,
  Form,
  Header,
  Input,
  Select,
  View
} from "@src/libs";
import outlet from "@src/stores/outlet";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import spg from "@src/stores/spg";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({
    form: {}
  });

  return (
    <View type={"SafeAreaView"}>
      <Header title={"Rencana Baru"} leftAction={true}></Header>
      <View
        type={"ScrollView"}
        style={{
          padding: 10,
          flexDirection: "column"
        }}
      >
        <Form
          data={meta.form}
          style={{
            flexGrow: 1,
            display: "flex"
          }}
        >
          <Field label={"Toko"} path={"outlet"} isRequired={true}>
            <Select
              placeholder={"Toko"}
              fieldType={"select"}
              items={outlet.list.map(item => {
                return {
                  text: item.name,
                  value: item.name
                };
              })}
            ></Select>
          </Field>
          <Field label={"Tanggal"} path={"date"}>
            <DatePicker fieldType={"date"}></DatePicker>
          </Field>
          <Field label={"Catatan"} path={"remarks"}>
            <Input
              placeholder={"Catatan"}
              fieldType={"input"}
              type={"multiline"}
            ></Input>
          </Field>
        </Form>
        <Button
          style={{
            marginTop: 30
          }}
          onPress={() => {
            spg.roadplan.push({
              ...meta.form,
              id: spg.roadplan.length,
              time: "09.00",
              status: "Pending",
              approval: "Waiting"
            } as any);
            meta.form = {};
            nav.goBack();
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold"
            }}
          >
            SAVE
          </Text>
        </Button>
      </View>
    </View>
  );
});
