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

export default function Home({ navigation }) {
  return (
    <View>
      <Text>user님 안녕하세요</Text>
      <View style={styles.lineButtonRow}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Scanner")}
        >
          <Text
            style={styles.buttonTextStyle}
            onPress={() => navigation.navigate("Scanner")}
          >
            일일통계
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Scanner")}
        >
          <Text style={styles.buttonTextStyle}>월별통계</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Scanner")}
        >
          <Text style={styles.buttonTextStyle}>스캔하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: 100,
    height: 100,
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



