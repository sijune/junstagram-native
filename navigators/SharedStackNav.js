import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import Feed from "../screens/Feed";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";
import Me from "../screens/Me";
import Notification from "../screens/Notification";
import SearchPhoto from "../screens/SearchPhoto";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        // headerStyle: {
        //   borderBottomWidth: "1px",
        // },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 170,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notification" ? (
        <Stack.Screen name="Notification" component={Notification} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SearchPhoto" component={SearchPhoto} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
}
