import { observer, useObservable } from "mobx-react-lite";
import React from "react";
import { ScrollView } from "react-native";
import { useDimensions } from "react-native-hooks";
import { useNavigation } from "react-navigation-hooks";
import {
  BottomNavigation,
  Button,
  Form,
  Header,
  View,
  Camera,
  Location
} from "./libs";
import { FormFieldProps } from "./libs/ui/Form";

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
      key: "birth",
      label: "Birth",
      type: "date"
    },
    {
      key: "message",
      label: "Message",
      type: "multiline"
    },
    {
      key: "gender",
      label: "Gender",
      type: "radio-group",
      option: {
        radio: {
          items: [
            {
              text: "Male",
              value: "male"
            },
            {
              text: "Female",
              value: "female"
            }
          ]
        }
      }
    },
    {
      key: "language",
      label: "Language",
      type: "checkbox-group",
      option: {
        checkbox: {
          items: [
            {
              text: "Indonesia",
              value: "ID"
            },
            {
              text: "English",
              value: "EN"
            },
            {
              text: "Japang",
              value: "JP"
            },
            {
              text: "Mandarin",
              value: "MD"
            }
          ]
        }
      }
    },
    {
      key: "photo",
      label: "Photo",
      type: "camera"
    },
    {
      key: "location",
      label: "Location",
      type: "location"
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
              fields={fields}
              setValue={setValue}
              style={{ marginBottom: 30 }}
            />
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
            />
          </View>
        </ScrollView>
        <BottomNavigation menus={menus} activePath="Dashboard" />
      </View>
    </View>
  );
});
