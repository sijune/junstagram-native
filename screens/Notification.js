import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import client, { logUserOut } from "../apollo";

export default function Notification() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text>Me</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => client.cache.evict({})}>
        <Text>cache clean</Text>
      </TouchableOpacity>
    </View>
  );
}
