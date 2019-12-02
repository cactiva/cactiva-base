import { observer, useObservable } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useDimensions } from "react-native-hooks";
import {
  capitalizeFLetter,
  ConfigTableProps,
  Image,
  randString,
  Table,
  Text,
  uuid,
  View,
  Crud
} from "./libs";
import { FormFieldProps } from "./libs/ui/FormJson";
import { CrudProps, ConfigCrudProps } from "./libs/ui/Crud";

export default observer(() => {
  const dim = useDimensions().window;
  const meta = useObservable({ list: [], p: 0, loading: false });
  const list = useObservable([
    {
      id: "1",
      fullname: "Khoirul Arif",
      email: "masterirul@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "2",
      fullname: "Khoirul",
      email: "asd@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "3",
      fullname: "Arif",
      email: "adsfasdfasdfasdfasdfasd@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "4",
      fullname: "asd",
      email: "sfs@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "11",
      fullname: "Khoirul Arif",
      email: "masterirul@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "12",
      fullname: "Khoirul",
      email: "asd@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "13",
      fullname: "Arif",
      email: "adsfasdfasdfasdfasdfasd@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "14",
      fullname: "asd",
      email: "sfs@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "21",
      fullname: "Khoirul Arif",
      email: "masterirul@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "22",
      fullname: "Khoirul",
      email: "asd@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "23",
      fullname: "Arif",
      email: "adsfasdfasdfasdfasdfasd@gmail.com",
      phone: "085770599179",
      gender: "male"
    },
    {
      id: "24",
      fullname: "asd",
      email: "sfs@gmail.com",
      phone: "085770599179",
      gender: "male"
    }
  ]);
  const field: FormFieldProps[] = [
    {
      fieldType: "Input",
      label: "Full Name",
      path: "fullname",
      field: {
        fieldType: "input",
        type: "text"
      }
    },
    {
      fieldType: "Input",
      label: "Email",
      path: "email",
      field: {
        fieldType: "input",
        type: "text"
      }
    },
    {
      fieldType: "Input",
      label: "Phone",
      path: "phone",
      field: {
        fieldType: "input",
        type: "text"
      }
    },
    {
      fieldType: "RadioGroup",
      label: "Gender",
      path: "gender",
      field: {
        fieldType: "radio-group",
        option: [
          {
            text: "Male",
            value: "Male",
            style: {
              marginRight: 10
            }
          },
          {
            text: "Female",
            value: "female"
          }
        ],
        style: {
          flexDirection: "row"
        }
      }
    }
  ];
  const configTable: ConfigCrudProps = {
    primary: "id",
    fields: [
      {
        name: "id",
        label: "No.",
        width: 40,
        fieldType: "Input"
      },
      {
        name: "fullname",
        label: "Full Name",
        width: 150,
        fieldType: "Input"
      },
      {
        name: "email",
        label: "Email",
        component: item => {
          return (
            <Text
              style={{
                backgroundColor: "#cddc39",
                padding: 5,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 8,
                color: "#4a4a4a",
                alignSelf: "flex-start"
              }}
            >
              {item.email}
            </Text>
          );
        },
        fieldType: "Input"
      },
      {
        name: "gender",
        label: "Gender",
        width: 120,
        fieldType: "RadioGroup",
        field: {
          option: [
            {
              text: "Male",
              value: "male",
              style: {
                marginRight: 5
              }
            },
            {
              text: "Female",
              value: "female"
            }
          ],
          style: {
            flexDirection: "row"
          }
        },
        component: item => {
          return <Text>{capitalizeFLetter(item.gender)}</Text>;
        }
      }
    ],
    table: {
      onScrollEnd: () => {
        meta.loading = true;
        meta.p += 1;
        const data = generateData(meta.p);
        setTimeout(() => {
          const list = [...meta.list, ...data];
          meta.list = list;
          meta.loading = false;
        }, 1000);
      }
    }
  };
  const generateData = prefix => {
    const fakeData = [];
    for (let i = 1; i <= 50; ++i) {
      fakeData.push({
        id: `${prefix}${i}`,
        fullname: randString(10),
        email: randString(10) + "@gmail.com",
        phone: uuid(""),
        gender: i % 2 === 0 ? "male" : "female"
      });
    }
    return fakeData;
  };
  useEffect(() => {
    meta.loading = true;
    const fakeData = generateData(meta.p);
    setTimeout(() => {
      meta.list = fakeData;
      meta.loading = false;
    }, 1000);
  }, []);

  return (
    <View
      type={"SafeAreaView"}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        height: dim.height,
        margin: 30,
        flexGrow: 1,
        flexShrink: 1
      }}
    >
      <View
        style={{
          flexGrow: 1,
          flexShrink: 1
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom: 30
          }}
        >
          <Image
            source={require("@src/assets/images/cactiva-logo.png")}
            style={{
              height: 80,
              width: 80,
              margin: 15
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "NotoSans-Regular"
            }}
          >
            Welcome to Cactiva Base App!
          </Text>
        </View>
        <View type={"ScrollView"} horizontal={true} style={{ flexGrow: 1 }}>
          {/* <Table
            data={meta.list}
            config={configTable}
            style={{
              flexGrow: 1
            }}
            loading={meta.loading}
            onScrollEnd={() => {
              meta.loading = true;
              meta.p += 1;
              const data = generateData(meta.p);
              setTimeout(() => {
                const list = [...meta.list, ...data];
                meta.list = list;
                meta.loading = false;
              }, 1000);
            }}
          ></Table> */}
          <Crud
            data={meta.list}
            config={configTable}
            style={{
              flexGrow: 1
            }}
          ></Crud>
        </View>
      </View>
    </View>
  );
});
