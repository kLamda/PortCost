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
import LottieView from "lottie-react-native";
import SelectDropdown from "react-native-select-dropdown";
 
export default function StartPage({navigation}) {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [dataList, getList] = useState([]);
  const [number3, setNumber3] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
     getData();
  }, []);

  const getData = () => {axios.get("http://192.168.43.156:3001/showall").then((response) => {
    const data = response.data;
    getList(data);
    setIsLoading(false);
    }).catch(function (error) {
        throw error;
    });
  };

  var submit = () => {
    var result = parseInt(number1) + parseInt(number2) + parseInt(number3);
    console.log(result);
    navigation.navigate('Result', {value: result});
  };

  let dropdownItems = dataList.map(a => a.name);

  if (isLoading) {
    return (
      <View style={styles.preLoader}>
        <LottieView
          source={require("../../assets/loading.json")}
          loop
          autoPlay>
        </LottieView>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.image} source={require("./../../assets/icon.png")} />
  
        <StatusBar style="auto" />

        <View>
          <SelectDropdown 
            data = {dropdownItems} 
            onSelect={(value) => {
              let number3 = dataList.find(a => a.name === value).number_3;
              console.log(value);
              setNumber3(number3);
            }}
            buttonTextAfterSelection = {(selectedItem, index)=>{return selectedItem}}
            rowTextForSelection={(item, index)=>{return item}}
            >
          </SelectDropdown>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            keyboardType="numeric"
            placeholder="Number 1"
            placeholderTextColor="#003f5c"
            onChangeText={(number1) => setNumber1(number1)}
          />
        </View>
  
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Number 2"
            keyboardType="numeric"
            placeholderTextColor="#003f5c"
            onChangeText={(number2) => setNumber2(number2)}
          />
        </View>
  
        <TouchableOpacity style={styles.proceedBtn} onPress={submit}>
          <Text style={styles.loginText}>Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
  
  preLoader: {
    backgroundColor: "#133971",
    flex: 1,
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