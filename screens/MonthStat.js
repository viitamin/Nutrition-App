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
  /*
  const [totalCarb, setTotalCarb] = useState(0);
  const [totalSugar, setTotalSugar] = useState(0);
  const [totalCalorie, setTotalCalorie] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  */
  const [totals, setTotals] = useState({
    carb: 0,
    sugar: 0,
    protein: 0,
    calorie: 0,
    fat: 0,
  });
  const [selectedMonth, setSelectedMonth] = useState();
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleTouchPicker = () => setIsPickerVisible(true);

  const handleConfirm = () => {
    setIsPickerVisible(false);
    getMonthData(selectedMonth);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const setData = (data) => {
    setTotals((prevTotals) => ({
      carb: prevTotals.carb + data.carb,
      sugar: prevTotals.sugar + data.sugar,
      protein: prevTotals.protein + data.protein,
      calorie: prevTotals.calorie + data.calorie,
      fat: prevTotals.fat + data.fat,
    }));
  };

  const example = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
    console.log(items[0], items[1]);
    //데이터 출력
  };

  const getMonthData = async (targetMonth) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      //데이터 출력
      items.forEach((item) => {
        const data = JSON.parse(item);
        if (data.month === targetMonth) {
          setData(data);
        }
      });
    } catch (error) {
      Alert.alert("Error", "로딩 실패");
    }
  };

  return (
    <View>
      <Text onPress={handleTouchPicker}>
        {selectedMonth
          ? selectedMonth + "월 영양성분 조회"
          : "조회할 달을 선택하세요"}
      </Text>

      {isPickerVisible && (
        <View>
          <Button title={"확인"} onPress={handleConfirm} />

          <MonthPicker
            selectedValue={selectedMonth}
            onValueChange={handleMonthChange}
          />
          <PieGraph data={totals} />
        </View>
      )}
    </View>
  );
}
