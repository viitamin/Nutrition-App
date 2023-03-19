import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
import Barcode from "./Scanner";
import { BARCODE_NUMBER } from "./Scanner";

const HACCP_API_KEY =
  "G5ifl7ixJfo7T2HJR6b7P%2FIvr4v6ILirbBv1Yj6rNUEJjZqo0ZLCAV8HWzq2NG8Dx19gpJiJdT%2FFVhddXrDSVw%3D%3D";
const PRODUCT_NUM_API_KEY = "a89f4295c0c040c4adaa";

//https://openapi.foodsafetykorea.go.kr/api/a89f4295c0c040c4adaa/C005/json/1/100/BAR_CD=`${barcodeNum}`
//https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService?ServiceKey=G5ifl7ixJfo7T2HJR6b7P%2FIvr4v6ILirbBv1Yj6rNUEJjZqo0ZLCAV8HWzq2NG8Dx19gpJiJdT%2FFVhddXrDSVw%3D%3D&prdlstReportNo=`${ProductNum}`&returnType=json

export default function Login({ navigation }) {
  const [productNum, setProductNum] = useState(null);
  console.log("바코드: " + BARCODE_NUMBER);

  return (
    <View>
      <Text>Login</Text>
      <Button title={"Hi"} onPress={() => navigation.navigate("Barcode")} />
      <Text>Go To Welcome</Text>
    </View>
  );
}
