import { light as lightTheme, mapping } from "@eva-design/eva";
import React, { useEffect } from "react";
import { ApplicationProvider } from "react-native-ui-kitten";
import { createStackNavigator } from "react-navigation-stack";
import { AppContainer } from "./src/libs/navigation";
import { observer, useObservable } from "mobx-react-lite";
import * as Font from "expo-font";
function importAllRoute(r) {
  const routes = {};
  r.keys().map(name => {
    const finalName = name.substr(2, name.length - 6);
    if (finalName.indexOf("libs/") === 0) return;
    routes[finalName] = {
      screen: r(name).default,
      path: finalName
    };
  });
  return routes;
}
const routes = importAllRoute(require.context("./src", true, /\.(tsx)$/));
function importAllFonts(r) {
  const fonts = {};
  r.keys().map(name => {
    const finalName = name.substr(2, name.length - 6);
    fonts[finalName] = r(name);
  });
  return fonts;
}
const customFonts = importAllFonts(
  require.context("./src/assets/fonts", true, /\.(ttf)$/)
);
const StackNav = createStackNavigator(routes, {
  headerMode: "none"
});
const Container = AppContainer(StackNav);

export default observer(() => {
  const meta = useObservable({
    fontLoaded: false
  });
  useEffect(() => {
    (async () => {
      await Font.loadAsync(customFonts);
      meta.fontLoaded = true;
    })();
  }, []);

  if (!meta.fontLoaded) {
    return null;
  }
  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Container />
    </ApplicationProvider>
  );
});
