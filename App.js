import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Analyzer from "./screens/Analyzer";
import Scanner from "./screens/Scanner";
import User from "./screens/Login/User";
import BodyInfo from "./screens/Login/BodyInfo";
import Home from "./screens/Home";
import Search from "./screens/Search";
import SearchAnalyzer from "./screens/SearchAnalyzer";
import DayStat from "./screens/DayStat";
import MonthStat from "./screens/MonthStat";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="BodyInfo" component={BodyInfo} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Analyzer" component={Analyzer} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="SearchAnalyzer" component={SearchAnalyzer} />
        <Stack.Screen name="DayStat" component={DayStat} />
        <Stack.Screen name="MonthStat" component={MonthStat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
