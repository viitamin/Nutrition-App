import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export let BARCODE_NUMBER = null;

export default function Scanner({ navigation }) {
  const [permission, setPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();
  //const [barcodeNum, setBarcodeNum] = useState(null);

  const askForCameraPermission = async () => {
    const { granted } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(granted ? true : false);
    console.log(granted);
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    BARCODE_NUMBER = data;
    console.log(BARCODE_NUMBER);
  };

  const getProductNumber = async () => {
    const response = await fetch(
      `https://openapi.foodsafetykorea.go.kr/api/a89f4295c0c040c4adaa/C005/json/1/100/BAR_CD=${BARCODE_NUMBER}`
    );
    const json = await response.json();
    console.log(json.C005.ROW);
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  getProductNumber();

  return (
    <View style={styles.container}>
      <View style={styles.textBg}>
        <Text style={styles.text}>Scan it!</Text>
      </View>
      <View style={styles.scannerBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      </View>
      <View>
        <Button
          title={"scan again"}
          onPress={() => {
            setScanned(false);
          }}
        />
      </View>
      <Button
        title={"I've got numbers go to next page"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  textBg: {
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 50,
  },
  scannerBox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "tomato",
    overflow: "hidden",
  },
  scanner: {
    height: 300,
    width: 300,
  },
});
