import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function MessageNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Rooms"
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons
              color={tintColor}
              name="close"
              size={28}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
        component={Rooms}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
