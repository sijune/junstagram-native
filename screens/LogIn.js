import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LogIn({ navigation }) {
  return (
    <View>
      <Text>Log In</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
