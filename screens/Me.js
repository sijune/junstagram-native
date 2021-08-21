import React from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import client, { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";

export default function Me({ navigation }) {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  });
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity>
        <Text>Me</Text>
      </TouchableOpacity>
    </View>
  );
}
