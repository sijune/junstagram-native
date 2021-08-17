import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    // 전역 설정 가능
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      {/* 개별 설정 가능 */}
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
