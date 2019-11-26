import {observer} from 'mobx-react-lite';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {useDimensions} from 'react-native-hooks';

export default observer(() => {
  const dim = useDimensions().window;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: dim.height,
      }}>
      <Image
        source={require('@src/assets/images/cactiva-logo.png')}
        style={{
          height: 80,
          width: 80,
          margin: 15,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'NotoSans-Regular',
        }}>
        Welcome to Cactiva Base App!
      </Text>
    </View>
  );
});
