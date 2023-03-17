import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const HACCP_API_KEY =
  "G5ifl7ixJfo7T2HJR6b7P%2FIvr4v6ILirbBv1Yj6rNUEJjZqo0ZLCAV8HWzq2NG8Dx19gpJiJdT%2FFVhddXrDSVw%3D%3D";
const PRODUCT_NUM_API_KEY = "a89f4295c0c040c4adaa";

//https://openapi.foodsafetykorea.go.kr/api/a89f4295c0c040c4adaa/C005/json/1/100/BAR_CD=`${barcodeNum}`
//https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService?ServiceKey=G5ifl7ixJfo7T2HJR6b7P%2FIvr4v6ILirbBv1Yj6rNUEJjZqo0ZLCAV8HWzq2NG8Dx19gpJiJdT%2FFVhddXrDSVw%3D%3D&prdlstReportNo=1983030801012&returnType=json

export default function Barcode({ navigation }) {
  const [permission, setPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();
  const [barcodeNum, setBarcodeNum] = useState(null);
  const [productNum, setProductNum] = useState(null);

  const askForCameraPermission = async () => {
    const { granted } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(granted ? true : false);
    console.log(granted);
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    setBarcodeNum(`${data}`);
    console.log(barcodeNum);
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  if (permission === false) {
    alert("Go to setting and allow camera access");
  }
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
        title={"I got numbers go to next page"}
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
