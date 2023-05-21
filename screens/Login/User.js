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
  const [password, setPassword] = useState("");

  const handleSetName = (text) => {
    setName(text);
    console.log(name);
  };

  const handleSetPassword = (text) => {
    setPassword(text);
  };

  return (
    <View>
      <Text>이름과 비밀번호를 입력해주세요</Text>
      <TextInput
        value={name}
        placeholder={"이름"}
        onChangeText={handleSetName}
      />
      <TextInput
        value={password}
        placeholder={"비밀번호"}
        onChangeText={handleSetPassword}
      />
      <Text onPress={() => navigation.navigate("BodyInfo")}>확인</Text>
      <Button
        title={"Next Page"}
        onPress={() => navigation.navigate("BodyInfo")}
      />
      <Button
        title={"검색으로갑니다"}
        onPress={() => {
          navigation.navigate("Search");
        }}
      />
    </View>
  );
}
<></>;
