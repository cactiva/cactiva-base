import { Button, Field, Form, Image, Input, View } from "@src/libs";
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

  const loginProcess = () => {
    if ((meta.data as any).username == "sales") {
      nav.navigate("sales/Main");
    } else if ((meta.data as any).username == "spg") {
      nav.navigate("spg/Main");
    } else {
      nav.navigate("smd/Main");
    }
  };

  return (
    <View type={"ScrollView"}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          flexGrow: 1,
          flexShrink: 1,
          display: "flex",
          padding: 10,
          backgroundColor: ""
        }}
        type={"View"}
      >
        <Image
          style={{
            height: 230,
            width: 230,
            alignSelf: "center",
            display: "flex",
            marginTop: 50,
            marginBottom: 50
          }}
          source={require("@src/assets/images/IMGBLOG.png")}
        ></Image>
        <Form
          style={{
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            backgroundColor: "",
            borderRadius: 4,
            paddingBottom: 300,
            flexGrow: 1
          }}
          data={meta.data}
          setValue={(value, path) => {
            meta.data[path] = value;
          }}
        >
          <Field label={"Username"} path={"username"} isRequired={true}>
            <Input fieldType={"input"} type={"text"}></Input>
          </Field>
          <Field label={"Password"} path={"password"} isRequired={true}>
            <Input fieldType={"input"} type={"password"}></Input>
          </Field>
          <Button
            style={{
              width: 100,
              alignSelf: "flex-end",
              marginTop: 30
            }}
            type={"submit"}
            onPress={loginProcess}
          >
            <Text
              style={{
                color: "#fafafa",
                fontWeight: "bold"
              }}
            >
              Login
            </Text>
          </Button>
        </Form>
      </View>
    </View>
  );
});
