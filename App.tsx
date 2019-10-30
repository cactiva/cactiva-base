import { light as lightTheme, mapping } from "@eva-design/eva";
import CobaForm from "@src/CobaForm";
import Home from "@src/Home";
import { observer } from "mobx-react-lite";
import React from "react";
import { ApplicationProvider } from "react-native-ui-kitten";
import { createStackNavigator } from "react-navigation-stack";
import { AppContainer } from "./src/libs/navigation";
const StackNav = createStackNavigator(
  {
    // Home,
    CobaForm
  },
  {
    headerMode: "none"
  }
);
const Container = AppContainer(StackNav);

export default observer(() => {
  // const meta = useObservable({
  //   fontLoaded: false
  // });
  // useEffect(() => {
  //   (async () => {
  //     await Font.loadAsync(fonts);
  //     meta.fontLoaded = true;
  //   })();
  // }, []);

  // if (!meta.fontLoaded) {
  //   return null;
  // }
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Container />
    </ApplicationProvider>
  );
});
