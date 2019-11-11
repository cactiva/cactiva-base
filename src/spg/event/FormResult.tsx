import { Camera, Field, Form, Input, Select, uuid, View } from "@src/libs";
import images from "@src/stores/images";
import produk from "@src/stores/produk";
import spg from "@src/stores/spg";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({
    form: {}
  });

  useEffect(() => {
    if (spg.resultTemp) {
      meta.form = spg.resultTemp;
      if (spg.resultTemp.lon && spg.resultTemp.lat) {
        (meta.form as any).location = {
          longitude: spg.resultTemp.lon,
          latitude: spg.resultTemp.lat
        };
      }
    }
  }, []);
  return (
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
        data={spg.resultTemp}
        style={{
          flexGrow: 1,
          display: "flex"
        }}
      >
        <Field label={"Produk"} path={"produk"} isRequired={true}>
          <Select
            fieldType={"select"}
            items={produk.list.map(item => {
              return {
                text: item.name,
                value: item.name
              };
            })}
          ></Select>
        </Field>
        <Field label={"Qty"} path={"qty"}>
          <Input fieldType={"input"} type="number"></Input>
        </Field>
        <Field
          label={"Display"}
          path={"foto_display"}
          setValue={v => {
            let path = uuid("foto_display_spg");
            images[path] = v;
            (meta.form as any).foto_display = path;
          }}
        >
          <Camera fieldType={"camera"}></Camera>
        </Field>
        <Field label={"Feedback"} path={"feedback"}>
          <Input fieldType={"input"} type={"multiline"}></Input>
        </Field>
        <Field label={"Catatan"} path={"remarks"}>
          <Input fieldType={"input"} type={"multiline"}></Input>
        </Field>
      </Form>
    </View>
  );
});
