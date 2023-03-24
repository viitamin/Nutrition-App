import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Button } from "react-native";
import Barcode from "./Scanner";

import { NUTRIENT } from "./Scanner";
export default function Login({ navigation }) {
  const text = NUTRIENT;
  const calorieRegex = /열량\s?(\d+\.?\d+)/;
  const carbRegex = /탄수화물\s?(\d+\.?\d+)/;
  const sugarRegex = /당류\s?(\d+\.?\d+)/;
  const proteinRegex = /단백질\s?(\d+\.?\d+)/;
  const fatRegex = /지방\s?(\d+\.?\d+)/;
  const sFatRegex = /포화지방\s?(\d+\.\d+)/;
  const tFatRegex = /트랜스지방\s?(\d+\.?\d+)/;
  const cholesterolRegex = /콜레스테롤\s?(\d+\.?\d+)/;
  const sodiumRegex = /나트륨\s?(\d+\.?\d+)/;

  const calorieMatch = text.match(calorieRegex);
  const carbMatch = text.match(carbRegex);
  const sugarMatch = text.match(sugarRegex);
  const proteinMatch = text.match(proteinRegex);
  const fatMatch = text.match(fatRegex);
  const sFatMatch = text.match(sFatRegex);
  const tFatMatch = text.match(tFatRegex);
  const cholesterolMatch = text.match(cholesterolRegex);
  const sodiumMatch = text.match(sodiumRegex);

  const nutrient = {
    calorie: calorieMatch ? calorieMatch[1] : 0,
    carb: carbMatch ? carbMatch[1] : 0,
    sugar: sugarMatch ? sugarMatch[1] : 0,
    protein: proteinMatch ? proteinMatch[1] : 0,
    fat: fatMatch ? fatMatch[1] : 0,
    sfat: sFatMatch ? sFatMatch[1] : 0,
    tfat: tFatMatch ? tFatMatch[1] : 0,
    cholesterol: cholesterolMatch ? cholesterolMatch[1] : 0,
    sodium: sodiumMatch ? sodiumMatch[1] : 0,
  };

  console.log(nutrient);

  return (
    <View>
      <Text>Login</Text>
      <Button title={"Hi"} onPress={() => navigation.navigate("Scanner")} />
      <Text>Go To Welcome</Text>

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
        포화지방: {nutrient.sfat}
        {"\n"}
        트랜스지방: {nutrient.tfat}
        {"\n"}
        콜레스테롤: {nutrient.cholesterol}
        {"\n"}
        나트륨: {nutrient.sodium}
        {"\n"}
      </Text>
    </View>
  );
}
