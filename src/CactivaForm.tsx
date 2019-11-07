import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { Image, ScrollView, Text } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import {
  BottomNavigation,
  Button,
  Carousel,
  DatePicker,
  Field,
  Form,
  Header,
  Input,
  RadioGroup,
  Select,
  View,
  DefaultTheme,
  Checkbox,
  CheckboxGroup,
  Radio
} from "./libs";

export const menus = [
  {
    sublabel: "Your",
    label: "Dashboard",
    icon: {
      name: "md-pie",
      source: "Ionicons"
    },
    path: "Dashboard",
    role: ["SMD", "SPGM", "SPGP", "MARKETING", "SALES"]
  },
  {
    sublabel: "Your",
    label: "Sales Order",
    icon: {
      name: "ios-cart",
      source: "Ionicons"
    },
    path: "CobaForm",
    role: ["SPGM", "SPGP", "MARKETING", "SALES"]
  },
  {
    sublabel: "Your",
    label: "Road Plan",
    icon: {
      name: "ios-car",
      source: "Ionicons"
    },
    path: "RoadPlan",
    role: ["SMD", "SPGM", "SPGP", "MARKETING", "SALES"]
  },
  {
    sublabel: "Your",
    label: "Visit",
    icon: {
      name: "ios-walk",
      source: "Ionicons"
    },
    path: "Visit",
    role: ["SMD", "SPGM", "SPGP", "MARKETING", "SALES"]
  }
];

export default observer(() => {
  const dim = useDimensions().window;
  const nav = useNavigation();
  const meta = useObservable({
    data: {
      firstname: "Khoirul",
      lastname: "Arif",
      email: "masterirul@gmail.com",
      username: "masterirul",
      address: "jalan-jalan yuk",
      age: 20,
      select: "",
      message: "",
      birth: "",
      gender: "",
      language: ["ID"],
      photo: "",
      location: null
    },
    check: false
  });

  const setValue = (value, key) => {
    meta.data[key] = value;
  };
  const items = [
    {
      text: "Option 1",
      value: "1"
    },
    {
      text: "Optoin 2",
      value: "2"
    },
    {
      text: "Optoin 3",
      value: "3"
    },
    {
      text: "Optoin 4",
      value: "4"
    },
    {
      text: "Optoin 5",
      value: "5"
    },
    {
      text: "Optoin 6",
      value: "6"
    },
    {
      text: "Optoin 7",
      value: "7"
    }
  ];
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-end"
      }}
    >
      <Header safeAreaView leftAction={"Default"} title={"Coba Form"} />
      <View
        style={{
          display: "flex",
          flex: 1
        }}
      >
        <View
          style={{
            display: "flex",
            flex: 1
          }}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <Carousel
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      height: 250,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={require("@src/assets/images/sample.jpg")}
                      style={{
                        width: dim.width,
                        height: 100
                      }}
                    />
                    <Text>{item}</Text>
                  </View>
                );
              }}
              data={["Coba", "siap", "bisa"]}
              sliderWidth={dim.width}
              itemWidth={dim.width}
            />
            <View
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "center",
                flex: 1,
                margin: 20,
                marginTop: 10,
                marginBottom: 10
              }}
            >
              <Form
                data={meta.data}
                setValue={setValue}
                style={{ marginBottom: 30 }}
              >
                <Field label="First Name" path="firstname" isRequired>
                  <Input fieldType="input" />
                </Field>
                <Field
                  label="Last Name"
                  path="lastname"
                  validate={value => {
                    if (!value) return ["Last Name diperlukan."];
                    else return false;
                  }}
                >
                  <Input fieldType="input" />
                </Field>
                <Field label="Select" path="select">
                  <Select fieldType="select" items={items} />
                </Field>
                <Field label="Birth" path="birth">
                  <DatePicker fieldType="date" />
                </Field>
                <Field label="Radio" path="gender">
                  <RadioGroup fieldType="radio-group" mode="checkbox">
                    <Radio
                      text="Male"
                      value="Male"
                      style={{ marginRight: 15 }}
                    />
                    <Radio
                      text="Female"
                      value="Female"
                      style={{ marginRight: 15 }}
                    />
                  </RadioGroup>
                </Field>
                <Field label="Checkbox" path="language">
                  <CheckboxGroup fieldType="checkbox-group">
                    <Checkbox text="ID" />
                    <Checkbox text="JP" />
                    <Checkbox text="EN" />
                    <Checkbox text="MD" />
                  </CheckboxGroup>
                </Field>
              </Form>
              <Button
                label="Save"
                iconStart={{
                  source: "Entypo",
                  name: "home",
                  size: 20,
                  color: "#fff"
                }}
                style={{
                  maxWidth: 350
                }}
                onPress={() => console.log(meta)}
              />
            </View>
          </ScrollView>
        </View>
        <BottomNavigation menus={menus} activePath="Dashboard" />
      </View>
    </View>
  );
});
