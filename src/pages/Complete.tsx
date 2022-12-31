import { View, Text, Pressable } from 'react-native'
import React from 'react'

const Complete = () => {

  const [count, setCount] = React.useState(0)
  return (
    <View>
      <Pressable onPress={() => setCount(p => p+1)}>완료</Pressable>
      <Text>{count}</Text>
    </View>
  )
}

export default Complete