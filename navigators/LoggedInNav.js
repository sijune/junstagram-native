import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import Upload from "../screens/Upload";
import UploadNav from "./UploadNav";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
}
