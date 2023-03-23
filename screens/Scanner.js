import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scanner({ navigation }) {
  const [permission, setPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState();
  const [barcodeNum, setBarcodeNum] = useState(null);
  const [productNum, setProductNum] = useState(null);
  const [nutrientInfo, setNutrientInfo] = useState(null);

  const askForCameraPermission = async () => {
    const { granted } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(granted ? true : false);
    console.log(granted);
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + " / Data: " + data);
    setBarcodeNum(data);
    console.log(barcodeNum);
  };
  //---------------------------------------------------api 연결 함수---------------------------------------------------------------------------
  const getProductNumberAPI = async () => {
    const response = await fetch(
      `http://openapi.foodsafetykorea.go.kr/api/a89f4295c0c040c4adaa/C005/json/1/100/BAR_CD=88002798` //${barcodeNum}
    );
    const json = await response.json();
    console.log(json.C005.row[0].PRDLST_REPORT_NO);
    setProductNum(json.C005.row[0].PRDLST_REPORT_NO);
    return json.C005.row[0].PRDLST_REPORT_NO;
  };

  const getNutritionInfoAPI = async (pn) => {
    const response = await fetch(
      `https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService?ServiceKey=G5ifl7ixJfo7T2HJR6b7P%2FIvr4v6ILirbBv1Yj6rNUEJjZqo0ZLCAV8HWzq2NG8Dx19gpJiJdT%2FFVhddXrDSVw%3D%3D&prdlstReportNo=1984044800212&returnType=json` //${ProductNum}
    );
    const json = await response.json();
    console.log(json.body.items[0].item.nutrient);
    setNutrientInfo(json.body.items[0].item.nutrient);
  };
  //---------------------------------------------------api 연결 함수 종료---------------------------------------------------------------------------

  //---------------------------------------------------구현부 시작---------------------------------------------------------------------------

  useEffect(() => {
    askForCameraPermission();
  }, []);

  if (barcodeNum !== null) {
    useEffect(() => {
      getNutritionInfoAPI(getProductNumberAPI());
    }, []);
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
            setBarcodeNum(null);
          }}
        />
      </View>
      <Text>Barcode Number: {barcodeNum}</Text>
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
