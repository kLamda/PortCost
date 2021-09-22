import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Try from "./result2";
import Profile from "./Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function SignedIn({route}){
  // console.log(route.params)
  return (
    <Tab.Navigator initialRouteName="Home" >
      <Tab.Screen name="Home" initialParams={route.params} component={Try} options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Profile" initialParams={route.params} component={Profile} options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      }}  />
    </Tab.Navigator>
  );
}