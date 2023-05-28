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

export default function Home({ navigation, route }) {
  const [userName, setUserName] = useState("user");
  useEffect(() => {
    setUserName(route.params.name);
  }, []);

  return (
    <View>
      <Text>{userName}님 안녕하세요</Text>
      <View style={styles.lineButtonRow}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("DayStat")}
        >
          <Text style={styles.buttonTextStyle}>일별통계</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("MonthStat")}
        >
          <Text style={styles.buttonTextStyle}>월별통계</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Scanner")}
        >
          <Text style={styles.buttonTextStyle}>스캔하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={styles.buttonTextStyle}>검색하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 70,
    height: 70,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonTextStyle: {},
  lineButtonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
