import React from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
export default function Login({ navigation }) {
  return (
    <View>
      <Text>Login</Text>
      <Button title={"Hi"} onPress={() => navigation.navigate("Welcome")} />
      <Text>Go To Welcome</Text>
    </View>
  );
}
