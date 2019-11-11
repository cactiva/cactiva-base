import { Button, Camera, Field, Form, Input, View, uuid } from "@src/libs";
import sales from "@src/stores/sales";
import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import images from "@src/stores/images";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({
    form: {}
  });

  useEffect(() => {
    if (sales.visitTemp) {
      meta.form = sales.visitTemp;
      if (sales.visitTemp.lon && sales.visitTemp.lat) {
        (meta.form as any).location = {
          longitude: sales.visitTemp.lon,
          latitude: sales.visitTemp.lat
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
        data={sales.visitTemp}
        style={{
          flexGrow: 1,
          display: "flex"
        }}
      >
        <Field label={"Temperature"} path={"temperature"}>
          <Input fieldType={"input"} type={"number"}></Input>
        </Field>
        <Field label={"Kerusakan"} path={"kerusakan"}>
          <Input fieldType={"input"}></Input>
        </Field>
        <Field
          label={"Display"}
          path={"foto_display"}
          setValue={v => {
            let path = uuid("foto_display_sales");
            images[path] = v;
            (meta.form as any).foto_display = path;
          }}
        >
          <Camera fieldType={"camera"}></Camera>
        </Field>
        <Field
          label={"Kompetitor"}
          path={"foto_kompetitor"}
          setValue={v => {
            let path = uuid("foto_display_sales");
            images[path] = v;
            (meta.form as any).foto_kompetitor = path;
          }}
        >
          <Camera fieldType={"camera"}></Camera>
        </Field>
        <Field label={"Status Pengunjung"} path={"status_pengunjung"}>
          <Input fieldType={"input"}></Input>
        </Field>
        <Field label={"Status Display"} path={"status_display"}>
          <Input fieldType={"input"}></Input>
        </Field>
        <Field label={"Catatan"} path={"remarks"}>
          <Input fieldType={"input"} type={"multiline"}></Input>
        </Field>
      </Form>
    </View>
  );
});
