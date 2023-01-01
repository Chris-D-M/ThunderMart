import {View, Text, Pressable} from 'react-native';
import React from 'react';

const Settings = () => {
  const [count, setCount] = React.useState(0);
  return (
    <View>
      <Pressable onPress={() => setCount(p => p + 1)}>
        <Text>{count}</Text>
      </Pressable>
    </View>
  );
};

export default Settings;
