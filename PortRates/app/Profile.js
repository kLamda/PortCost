import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile ({ navigation, route }) {
    let userData = route.params;
    return (
        <View style={{ paddingVertical: 20 }}>
            <Card>
            <View
                style={{
                backgroundColor: "#bcbec1",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
                borderRadius: 40,
                alignSelf: "center",
                marginBottom: 20
                }}
            >
                <Text style={{ color: "white", fontSize: 28 }}>{userData.userName[0]}</Text>
            </View>
            <View>
                <Text>Name : {userData.userName}</Text>
                <Text>Email address : {userData.email}</Text>
                <Text>Phone number : {userData.phone}</Text>
                <Text>Days Left : {userData.daysLeft}</Text>
            </View>
            <View style={{marginTop: 20}}>
            <Button
                backgroundColor="#03A9F4"
                title="SIGN OUT"
                onPress={() => {
                    AsyncStorage.clear();
                    navigation.navigate("Signup")
                }}
            />
            </View>
            </Card>
        </View>
    );
}