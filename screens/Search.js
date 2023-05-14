import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SearchBar } from "react-native-screens";

export default function Search({ navigation }) {
  return (
    <View>
      <SearchBar placeholder={"음식을 입력해주세요"} />
    </View>
  );
}
