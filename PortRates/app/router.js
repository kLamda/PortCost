import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Agent from "./Agent";
import Profile from "./Profile";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import ExpImp from "./ExpImp";
import Stevedore from "./Stevedore";

const Tab = createBottomTabNavigator();

export function SignedIn({route}){
  let data = route.params;
  let error = null;
  if(data.isVesAgent==false && data.isStevedore==false && data.isExpImp==false){
    error = "Kindly Contact Admin to Provide either Access.";
  }else{
    error = null;
  }
  return (
    <Tab.Navigator initialRouteName="Home" >
      {data.isVesAgent ?
      <Tab.Screen name="Agent" initialParams={route.params} component={Agent} options={{
      tabBarLabel: 'Agent',
      tabBarIcon: () => (
          <MaterialCommunityIcons name="face-agent" size={24} color="black" />
        ),
      }} />: null }
      {data.isExpImp ?
      <Tab.Screen name="Export/Import" initialParams={route.params} component={ExpImp} options={{
      tabBarLabel: 'Export/Import',
      tabBarIcon: () => (
          <MaterialIcons name="import-export" size={24} color="black" />
        ),
      }} />: null }
      {data.isStevedore ?
      <Tab.Screen name="Stevedore" initialParams={route.params} component={Stevedore} options={{
      tabBarLabel: 'Stevedore',
      tabBarIcon: () => (
          <MaterialCommunityIcons name="ship-wheel" size={24} color="black" />
        ),
      }} />: null }
      <Tab.Screen name="Profile" initialParams={{"user" : route.params ,"error" : error}} component={Profile} options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" color={color} size={size} />
        ),
      }}  />
    </Tab.Navigator>
  );
}