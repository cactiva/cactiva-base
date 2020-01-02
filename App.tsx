import {observer, useObservable} from 'mobx-react-lite';
import React, {useEffect} from 'react';
import {AppContainer} from './src/libs/navigation';
import * as Font from 'expo-font';
import fonts from '@src/fonts';

const Container = AppContainer();
export default observer(() => {
  const meta = useObservable({
    fontLoaded: false,
  });
  useEffect(() => {
    (async () => {
      await Font.loadAsync(fonts);
      meta.fontLoaded = true;
    })();
  }, []);

  if (!meta.fontLoaded) {
    return null;
  }
  return (
    <Container
      style={{
        flex: 1,
      }}
    />
  );
});
