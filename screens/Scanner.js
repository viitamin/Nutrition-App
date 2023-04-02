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
import { BarCodeScanner } from "expo-barcode-scanner";
import { HACCP_API_KEY, PRODUCT_NUM_API_KEY } from "../private/apiKey";

let NUTRIENT = null;

export default function Scanner({ navigation }) {
  const [permission, setPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [barcodeNum, setBarcodeNum] = useState(null);
  const [nutrientInfo, setNutrientInfo] = useState(null);
  const [productName, setProductName] = useState(null);
  const [itemList, setItemList] = useState([]);

  const addItem = (productName, nutritionInfo) => {
    //동적 객체배열입니다.
    const newItem = { name: productName, nutrition: nutritionInfo };
    const newItems = [...itemList, newItem];
    setItemList(newItems);
  };

  const askForCameraPermission = async () => {
    const { granted } = await BarCodeScanner.requestPermissionsAsync();
    setPermission(granted ? true : false);
    console.log(granted);
  };
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    console.log("바코드 타입: " + type + " / 바코드 번호: " + data);
    setBarcodeNum(data);
    console.log("시발" + barcodeNum);
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
    const name = json.body.items[0].item.prdlstNm;
    const nutrient = json.body.items[0].item.nutrient;
    setNutrientInfo(nutrient);
    setProductName(name);

    NUTRIENT = nutrient;
    console.log("상품 이름1: " + name);
    console.log(NUTRIENT);
    if (name !== null) {
      Alert.alert("이름확인하겠습니다", `${name}이(가) 맞나요?`, [
        {
          text: "Yes",
          onPress: () => {
            addItem(name, nutrient);
          },
        },
        { text: "No", onPress: () => "꺼지셈" },
      ]);
    }
  };
  //---------------------------------------------------api 연결 함수 종료---------------------------------------------------------------------------

  //  1. 카메라 승인요청
  //  2. handleBarCodeScanned 함수 실행
  //    - 함수 작동 순서
  //    - 바코드를 인식 -> getProductNumberAPI로 바코드파라미터 넘기고 물건번호 리턴받음 -> getNutritionInfoAPI 로 리턴받은 물건번호 파라미터로 전달
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

      <ScrollView style={styles.checkScrollView}>
        {itemList.map((item) => (
          <View style={styles.productCheck} key={item.name}>
            <Text style={styles.checkText}>{item.name} 추가</Text>
          </View>
        ))}
      </ScrollView>

      <Button
        title={"Checkboxes have been checked"}
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: 350,
  },
  checkScrollView: {
    height: 230,
    backgroundColor: "grey",
  },
  productCheck: {
    backgroundColor: "yellow",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    width: 350,
    height: 50,
    paddingHorizontal: 30,
  },
  checkText: {
    fontSize: 17,
  },
  checkIcon: {
    flexDirection: "row",

    justifyContent: "space-between",
    width: 60,
  },
});

export { NUTRIENT };
