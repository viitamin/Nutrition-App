import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Analyzer from "./screens/Analyzer";
import Scanner from "./screens/Scanner";
import User from "./screens/Login/User";
import BodyInfo from "./screens/Login/BodyInfo";
import Home from "./screens/Home";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
