import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
 
export default function StartPage({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dataList, getList] = useState([]);
  useEffect(() => {
     getData();
  }, []);

  const getData = () => {axios.get("http://192.168.43.156:3001/showall").then((response) => {
    const data = response.data;
    getList(data);
    }).catch(function (error) {
                throw error;
                console.log(error);
    });
  };

  var submit = () => {
    console.log(email);
    console.log(password);
    console.log(dataList[0].number_3);
    navigation.navigate('Result');
  };

 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={require("./../../assets/icon.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          keyboardType="numeric"
          placeholder="Number 1"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Number 2"
          keyboardType="numeric"
          placeholderTextColor="#003f5c"
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity style={styles.proceedBtn} onPress={submit}>
        <Text style={styles.loginText}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
 
  image: {
    marginBottom: 40,
    height: 100,
    width: 100,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
  },
 
  proceedBtn: {
    width: "50%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});