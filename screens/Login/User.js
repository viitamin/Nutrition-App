import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

export default function User({ navigation }) {
  const [name, setName] = useState("");

  const handleSetName = (text) => {
    setName(text);
    console.log(name);
  };

  return (
    <View>
      <Text>이름을 입력해주세요</Text>
      <TextInput
        style={styles.textStyle}
        value={name}
        placeholder={"이름"}
        onChangeText={handleSetName}
      />

      <Button
        title={"Next Page"}
        onPress={() => navigation.navigate("Home", { name: name })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
  },
});
