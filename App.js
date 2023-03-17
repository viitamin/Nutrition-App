import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./screens/Login";
import Barcode from "./screens/Barcode";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Barcode" component={Barcode} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
