import React from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Profile({ navigation, route }) {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: `${route.params.username}'s profile`,
      });
    }
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile</Text>
    </View>
  );
}
