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
import DropDownPicker from "react-native-custom-dropdown";
import Input from 'react-native-input-style';
import {useFonts, NunitoSans_800ExtraBold } from '@expo-google-fonts/nunito-sans';
 
export default function StartPage({navigation}) {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [dataList, getList] = useState([]);
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownItems, setDropdownItems] = useState([]);
  useEffect(() => {
     getData();
  }, []);

  let [fontsLoaded] = useFonts({
    NunitoSans_800ExtraBold
  });

  const getData = () => {axios.get("http://192.168.43.156:3001/showall").then((response) => {
    const data = response.data;
    getList(data);
    setIsLoading(false);
    getItem(data);
    }).catch(function (error) {
        throw error;
    });
  };

  const getItem = (dataList) => {
    let arr = [];
    for(let i =0; i< dataList.length; i++){
      arr.push({label: dataList[i].label, value: dataList[i].label});
    }
    setDropdownItems(arr);
  }

  var submit = () => {
    num1 = parseInt(number1);
    num2 = 0;
    num3 = 0;
    num2 = parseInt(number2);
    num3 = parseInt(number3);
    num4 = parseInt(number4);
    var sum_ = num1 + num4;
    var diff_ = num1 - num4;
    var div_ = num1 / num4;
    var mul_ = num1 * num4;
    
    navigation.navigate('Result', {value: {'addition': sum_, 'subtraction': diff_, 'division': div_, 'multiplication': mul_}});
  };
  var onChange3 = (value) => {
    console.log(value);
  };
  if (isLoading) {
    return (
      <View style={styles.preLoader}>
        <LottieView
          source={require("../assets/loading.json")}
          loop
          autoPlay>
        </LottieView>
      </View>
    );
  } else {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Hey
          </Text>
          <Text style={styles.headerText}>
            There
            <Text style={styles.headerDot}>{'\u2B24'}</Text>
          </Text>
        </View>
        <Image style={styles.topImage} source={require("../assets/top1.png")} />
        <Image style={styles.topImage} source={require("../assets/top2.png")} />
        <Image style={styles.bottomImage} source={require("../assets/bottom1.png")} />
        <Image style={styles.bottomImage} source={require("../assets/bottom2.png")} />
  
        <StatusBar style="auto" />

        <DropDownPicker
          items={[{label: "Foreign", value: 0}, {label: "Coastal", value: 1}]}
          containerStyle={{height: 43, width: "86%", marginBottom: 20}}
          itemStyle={{
              justifyContent: 'center',
          }}
          labelStyle={{
              fontSize: 16,
              color: '#000'
          }}
          dropDownStyle={{backgroundColor: '#D7E2FE'}}
          placeholder= "Select Calculation Type"
          />
        
        <DropDownPicker
          items={dropdownItems}
          placeholder= "Select Port"
          containerStyle={{height: 43, width: "86%", marginBottom: 20}}
          itemStyle={{
              justifyContent: 'center',
          }}
          labelStyle={{
              fontSize: 16,
              color: '#000'
          }}
          dropDownStyle={{backgroundColor: '#D7E2FE'}}
          onChangeItem={item => {
              let number4 = dataList.find(a => a.label === item.value).number_3;
              console.log(item.value);
              setNumber4(number4);
            }}/>

        <View style={styles.inputText}>
          <TextInput
            style={styles.input}
            placeholder="Number 1"
            keyboardType="numeric"
            onChangeText={(value) => setNumber1(value)}
          />
        </View>
  
        <TouchableOpacity style={styles.proceedBtn} onPress={submit}>
          <Text style={styles.btnText}>Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({

  inputText: {
    width: "86%",
  },

  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50%",
    backgroundColor: "#fff",
  },

  header: {
    position: "absolute",
    left: "5%",
    top: "20%",
  },

  headerText: {
    fontSize: 100,
    fontFamily: "NunitoSans_800ExtraBold",
  },

  headerDot: {
    fontSize: 20,
    color: "#7EA1FB",
  },
  
  topImage:{
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    resizeMode: "stretch",
  },

  bottomImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    resizeMode: "stretch",
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
 
  proceedBtn: {
    width: "35%",
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
    backgroundColor: "#D7E2FE",
  },
  btnText: {
    fontSize: 16
  }
});