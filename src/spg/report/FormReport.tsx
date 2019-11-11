import {
  Button,
  Field,
  Form,
  Input,
  Select,
  View,
  Header,
  DatePicker
} from "@src/libs";
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
  const meta = useObservable({
    form: {} as any
  });

  useEffect(() => {
    if (spg.selectedReport) {
      meta.form = { ...spg.selectedReport };
    }
  }, []);
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
      <Header title={"Report"} leftAction={true}></Header>
      <View
        type={"ScrollView"}
        style={{
          padding: 10,
          flexDirection: "column",
          flexShrink: 1,
          paddingBottom: 30,
          display: "flex",
          flexGrow: 1
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
            <DatePicker fieldType="date"></DatePicker>
          </Field>
          <Field label={"Feedback"} path={"feedback"}>
            <Input fieldType={"input"} type={"multiline"}></Input>
          </Field>
          <Field label={"Catatan"} path={"remarks"}>
            <Input fieldType={"input"} type={"multiline"}></Input>
          </Field>
          <Button
            onPress={() => {
              const list = [...spg.report];
              if (!meta.form.id) {
                list.push({
                  id: spg.report.length,
                  ...meta.form
                });
              } else {
                let idx = list.findIndex(x => x.id === meta.form.id);
                list[idx] = spg.selectedReport = meta.form;
              }
              spg.report = list;
              nav.goBack();
            }}
          >
            <Text
              style={{
                color: "#fff"
              }}
            >
              Simpan
            </Text>
          </Button>
        </Form>
      </View>
    </View>
  );
});
