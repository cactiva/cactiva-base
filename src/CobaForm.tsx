import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { ScrollView, Text, TouchableOpacity, TextInput } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import { BottomNavigation, Form, Header, View, DefaultTheme } from "./libs";
import { FormFieldProps } from "./libs/ui/form";

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
      firstName: "Khoirul",
      lastName: "Arif",
      email: "masterirul@gmail.com",
      username: "masterirul",
      address: "jalan-jalan yuk",
      age: 20,
      select: "",
      message: "",
      birthDate: ""
    }
  });

  const setValue = (value, key) => {
    meta.data[key] = value;
  };
  const fields: FormFieldProps[] = [
    {
      key: "firstName",
      label: "First Name",
      type: "text",
      iconStart: {
        source: "Entypo",
        name: "users",
        size: 18
      }
    },
    {
      key: "lastName",
      label: "Last Name",
      type: "text"
    },
    {
      key: "select",
      label: "Pilihan",
      type: "select",
      iconStart: {
        source: "Entypo",
        name: "users",
        size: 18
      },
      option: {
        select: {
          items: [
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
          ]
        }
      }
    },
    {
      key: "email",
      label: "Email",
      type: "text"
    },
    {
      key: "username",
      label: "Username",
      type: "text"
    },
    {
      key: "address",
      label: "Address",
      type: "text"
    },
    {
      key: "age",
      label: "Age",
      type: "number"
    },
    {
      key: "message",
      label: "Message",
      type: "multiline"
    }
  ];

  return (
    <View safeAreaView={true}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-end",
          height: dim.height
        }}
      >
        <Header leftAction={"Default"} title={"Coba Form"} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View
            style={{
              display: "flex",
              flex: 1,
              margin: 20,
              marginTop: 10,
              marginBottom: 10
            }}
          >
            <Form
              data={meta.data}
              fields={fields}
              setValue={setValue}
              style={{
                marginBottom: 20
              }}
            />

            <TouchableOpacity
              style={{
                borderRadius: 4,
                backgroundColor: DefaultTheme.primary
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  padding: 10,
                  textAlign: "center",
                  paddingTop: 15,
                  paddingBottom: 15
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BottomNavigation menus={menus} activePath="Dashboard" />
      </View>
    </View>
  );
});
