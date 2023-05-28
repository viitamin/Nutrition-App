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
import { Picker } from "@react-native-picker/picker";
import MonthPicker from "../components/MonthPicker";
import PieGraph from "../components/PieGraph";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function MonthStat({ navigation }) {
  const [foodList, setFoodList] = useState([]);
  const [todayDate, setTodayDate] = useState({ year: 0, month: 0, day: 0 });
  const [totals, setTotals] = useState({
    carb: 0,
    sugar: 0,
    protein: 0,
    calorie: 0,
    fat: 0,
  });

  const setDate = () => {
    const curTime = new Date();
    const year = curTime.getFullYear();
    const month = curTime.getMonth() + 1;
    const day = curTime.getDate();

    setTodayDate({ year, month, day });
  };

  useEffect(() => {
    setDate();
  }, []);

  const setData = (data) => {
    setTotals((prevTotals) => ({
      carb: prevTotals.carb + data.carb,
      sugar: prevTotals.sugar + data.sugar,
      protein: prevTotals.protein + data.protein,
      calorie: prevTotals.calorie + data.calorie,
      fat: prevTotals.fat + data.fat,
    }));
    setFoodList(foodList.push(data.name));
  };

  const getMonthData = async (todayDate) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      //데이터 출력
      items.forEach((item) => {
        const data = JSON.parse(item);
        if (
          data.year === todayDate.year &&
          data.month === todayDate.month &&
          data.day === todayDate.day
        ) {
          setData(data);
        }
      });
    } catch (error) {
      Alert.alert("Error", "로딩 실패");
    }
  };

  useEffect(() => {
    getMonthData;
  }, []);

  return (
    <View>
      <Text>
        {todayDate.year}년 {todayDate.month}월 {todayDate.day}일 현재까지 섭취한
        영양성분 정보입니다.
      </Text>
      {foodList.map((item, index) => (
        <Text key={index}>
          {item}
          {"\n"}
        </Text>
      ))}

      <PieGraph data={totals} />
    </View>
  );
}
