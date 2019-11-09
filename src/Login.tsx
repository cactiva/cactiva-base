import { Button, Field, Form, Input, View } from "@src/libs";
import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({
    data: {}
  });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Form
        style={{
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center",
          width: 400,
          backgroundColor: "#f0f7fa",
          borderRadius: 4
        }}
        data={meta.data}
        setValue={(value, path) => {
          meta.data[path] = value;
        }}
      >
        <Field label={"Username"} path={"username"}>
          <Input
            placeholder={"Input"}
            fieldType={"input"}
            type={"text"}
          ></Input>
        </Field>
        <Field label={"Password"} path={"password"}>
          <Input
            placeholder={"Input"}
            fieldType={"input"}
            type={"text"}
          ></Input>
        </Field>
        <Button
          style={{
            width: 100
          }}
        >
          <Text>Button</Text>
        </Button>
      </Form>
    </View>
  );
});
