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
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const genderData = ["남자", "여자"];

  return (
    <View>
      <Text>키/나이/몸무게를 입력해주세요</Text>

      <TextInput placeholder={"성별"} />
      <TextInput placeholder={"나이"} />
      <TextInput placeholder={"키"} keyboardType="phone-pad" />
      <TextInput placeholder={"몸무게"} />

      <Text onPress={() => navigation.navigate("Home")}>확인</Text>
    </View>
  );
}
