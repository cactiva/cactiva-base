import { light as lightTheme, mapping } from '@eva-design/eva';
import React, { useEffect } from 'react';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { createStackNavigator } from 'react-navigation-stack';
import { AppContainer } from './src/libs/navigation.web';
import { observer, useObservable } from 'mobx-react-lite';
import * as Font from 'expo-font';
function importAllRoute(r) {
  const routes = {};
  r.keys().map(name => {
    const finalName = name.substr(2, name.length - 6);
    if (finalName.indexOf('libs/') === 0) return;
    routes[finalName] = {
      screen: r(name).default,
      path: finalName
    };
  });
  return routes;
}
const routes = importAllRoute(require.context('./src', true, /\.(tsx)$/));
const StackNav = createStackNavigator(routes, {
  headerMode: 'none'
});
const Container = AppContainer(StackNav);

export default observer(() => {
  const meta = useObservable({
    fontLoaded: false
  });
  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        regular: require('@src/assets/fonts/Regular.ttf'),
        light: require('@src/assets/fonts/Light.ttf'),
        extralight: require('@src/assets/fonts/ExtraLight.ttf'),
        semibold: require('@src/assets/fonts/SemiBold.ttf'),
        bold: require('@src/assets/fonts/Bold.ttf')
      });
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
