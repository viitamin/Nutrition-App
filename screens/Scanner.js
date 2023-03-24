import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

let NUTRIENT = null;
const HACCP_API_KEY =
  "G5ifl7ixJfo7T2HJR6b7P%2FIvr4v6ILirbBv1Yj6rNUEJjZqo0ZLCAV8HWzq2NG8Dx19gpJiJdT%2FFVhddXrDSVw%3D%3D";
const PRODUCT_NUM_API_KEY = "a89f4295c0c040c4adaa";

export default function Scanner({ navigation }) {
  const [permission, setPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [barcodeNum, setBarcodeNum] = useState(null);
  const [nutrientInfo, setNutrientInfo] = useState(null);
  const [productName, setProductName] = useState(null);

  const askForCameraPermission = async () => {
    const { granted } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(granted ? true : false);
    console.log(granted);
  };
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log("바코드 타입: " + type + " / 바코드 번호: " + data);
    setBarcodeNum(data);
    console.log("tlqk" + barcodeNum);
    const productNumber = await getProductNumberAPI(data);
    await getNutritionInfoAPI(productNumber);
  };
  //---------------------------------------------------api 연결 함수---------------------------------------------------------------------------
  const getProductNumberAPI = async (barcodeNum) => {
    const response = await fetch(
      `http://openapi.foodsafetykorea.go.kr/api/${PRODUCT_NUM_API_KEY}/C005/json/1/100/BAR_CD=${barcodeNum}` //${barcodeNum}
    );
    const json = await response.json();
    const productNumber = json.C005.row[0].PRDLST_REPORT_NO;
    console.log("품목제조보고번호: " + productNumber);
    return productNumber;
  };

  const getNutritionInfoAPI = async (productNum) => {
    const response = await fetch(
      `https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService?ServiceKey=${HACCP_API_KEY}&prdlstReportNo=${productNum}&returnType=json` //${ProductNum}
    );
    const json = await response.json();
    setNutrientInfo(json.body.items[0].item.nutrient);
    setProductName(json.body.items[0].item.prdlstNm);
    NUTRIENT = json.body.items[0].item.nutrient;
    const myProduct = json.body.items[0].item.prdlstNm;
    console.log("상품 이름1: " + productName);
    console.log("상품 이름2: " + myProduct);
    console.log(NUTRIENT);
  };
  //---------------------------------------------------api 연결 함수 종료---------------------------------------------------------------------------

  //---------------------------------------------------구현부 시작---------------------------------------------------------------------------

  useEffect(() => {
    askForCameraPermission();
  }, []);

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
      <Text>Product name: {productName}</Text>
      <Button
        title={"I've got numbers go to the next page"}
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

export { NUTRIENT };
