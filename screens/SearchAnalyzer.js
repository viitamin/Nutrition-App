import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Button, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import foodData from "../FoodData";
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SearchAnalyzer({ navigation, route }) {
  const foodKey = route.params.item;
  console.log(foodKey);
  console.log(foodData[foodKey]);
  const [calorie, setCalorie] = useState(0);
  const [carb, setCarb] = useState(0);
  const [sugar, setSugar] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);

  useEffect(() => {
    setCalorie(foodData[foodKey].calorie);
    setCarb(foodData[foodKey].carb);
    setSugar(foodData[foodKey].sugar);
    setFat(foodData[foodKey].fat);
    setProtein(foodData[foodKey].protein);
  }, [foodKey]);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };
  const NutritionData = [
    {
      name: "탄수화물",
      amount: parseInt(calorie),
      color: "tomato",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },

    {
      name: "단백질",
      amount: parseInt(protein),
      color: "lime",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "지방",
      amount: parseInt(fat),
      color: "skyblue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View>
      <Text>분석 결과</Text>
      <Text>
        칼로리: {calorie}
        {"\n"}
        탄수화물: {carb}
        {"\n"}
        당류: {sugar}
        {"\n"}
        단백질: {protein}
        {"\n"}
        지방: {fat}
        {"\n"}
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
    </View>
  );
}
