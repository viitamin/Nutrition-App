import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  Alert,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Analyzer({ navigation, route }) {
  const itemList = route.params.itemList;

  const text = itemList[0].nutrition;
  const calorieRegex = /열량\s?(\d+\.?\d+)/;
  const carbRegex = /탄수화물\s?(\d+\.?\d+)/;
  const sugarRegex = /당류\s?(\d+\.?\d+)/;
  const proteinRegex = /단백질\s?(\d+\.?\d+)/;
  const fatRegex = /지방\s?(\d+\.?\d+)/;

  /* const sFatRegex = /포화지방\s?(\d+\.\d+)/;
  const tFatRegex = /트랜스지방\s?(\d+\.?\d+)/;
  const cholesterolRegex = /콜레스테롤\s?(\d+\.?\d+)/;
  const sodiumRegex = /나트륨\s?(\d+\.?\d+)/;
*/

  const calorieMatch = text.match(calorieRegex);
  const carbMatch = text.match(carbRegex);
  const sugarMatch = text.match(sugarRegex);
  const proteinMatch = text.match(proteinRegex);

  const fatMatch = text.match(fatRegex);

  /* const sFatMatch = text.match(sFatRegex);
  const tFatMatch = text.match(tFatRegex);
  const cholesterolMatch = text.match(cholesterolRegex);
  const sodiumMatch = text.match(sodiumRegex);*/

  const nutrient = {
    calorie: calorieMatch ? calorieMatch[1] : 0,
    carb: carbMatch ? carbMatch[1] : 0,
    sugar: sugarMatch ? sugarMatch[1] : 0,
    protein: proteinMatch ? proteinMatch[1] : 0,
    fat: fatMatch ? fatMatch[1] : 0,
    /* sfat: sFatMatch ? sFatMatch[1] : 0,
    tfat: tFatMatch ? tFatMatch[1] : 0,
    cholesterol: cholesterolMatch ? cholesterolMatch[1] : 0,
    sodium: sodiumMatch ? sodiumMatch[1] : 0,*/
  };
  //여기서부터 nutrient활용해서 작성하면됨

  const handleSaveData = async () => {
    addSaveTime();
    console.log(nutrient);
    const serializedData = JSON.stringify(nutrient);
    try {
      await AsyncStorage.setItem("dataKey", serializedData);
      Alert.alert("Success", "Data saved successfully.", [
        { text: "OK", onPress: handleAlertOK },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save data.");
      console.log("Error saving data:", error);
    }
  };

  const addSaveTime = () => {
    const curTime = new Date();
    const year = curTime.getFullYear();
    const month = curTime.getMonth() + 1;
    const day = curTime.getDate();
    nutrient.year = year;
    nutrient.month = month;
    nutrient.day = day;
  };

  const handleAlertOK = () => {
    navigation.navigate("Home");
  };

  console.log(nutrient);
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };
  const NutritionData = [
    {
      name: "탄수화물",
      amount: parseInt(nutrient.carb),
      color: "tomato",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },

    {
      name: "단백질",
      amount: parseInt(nutrient.protein),
      color: "lime",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "지방",
      amount: parseInt(nutrient.fat),
      color: "skyblue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View>
      <Text>분석 결과</Text>

      <Text>
        칼로리: {nutrient.calorie}
        {"\n"}
        탄수화물: {nutrient.carb}
        {"\n"}
        당류: {nutrient.sugar}
        {"\n"}
        단백질: {nutrient.protein}
        {"\n"}
        지방: {nutrient.fat}
        {"\n"}
        {/*
        포화지방: {nutrient.sfat}
        {"\n"}
        트랜스지방: {nutrient.tfat}
        {"\n"}
        콜레스테롤: {nutrient.cholesterol}
        {"\n"}
        나트륨: {nutrient.sodium}
        {"\n"}
  */}
      </Text>
      <View>
        <PieChart
          data={NutritionData}
          width={SCREEN_WIDTH}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      <Text
        onPress={() => {
          handleSaveData();
        }}
      >
        저장후 홈으로
      </Text>
      <Button
        title={"Scanner"}
        onPress={() => navigation.navigate("Scanner")}
      />
    </View>
  );
}
