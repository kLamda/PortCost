import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function EndPage({route}) 
{

     return(
        <View >
           <Text> Value: {route.params.value} </Text>
        </View>
     );
}