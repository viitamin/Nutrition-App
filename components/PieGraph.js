import React from "react";
import { Text, View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function PieGraph({ data }) {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };
  const NutritionData = [
    {
      name: "탄수화물",
      amount: parseInt(data.carb),
      color: "tomato",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },

    {
      name: "단백질",
      amount: parseInt(data.protein),
      color: "lime",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "지방",
      amount: parseInt(data.fat),
      color: "skyblue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View>
      <Text>분석 결과</Text>
      <Text>
        칼로리: {data.calorie}
        {"\n"}
        탄수화물: {data.carb}
        {"\n"}
        당류: {data.sugar}
        {"\n"}
        단백질: {data.protein}
        {"\n"}
        지방: {data.fat}
        {"\n"}
      </Text>

      <View>
        <PieChart
          data={NutritionData}
          width={SCREEN_WIDTH}
          height={200}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    </View>
  );
}
