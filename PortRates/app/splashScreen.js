import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottiePreloader from './lottieLoader';
import { Alert } from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect( () => {
    AsyncStorage.getItem('user_id').then((value) =>{
      fetch("http://192.168.43.156:3000/api/getTime", {
        method: "POST",
        body: JSON.stringify({"user_id": value}),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((responseO) => responseO.json())
      .then((responseOJSON) => {
        if(responseOJSON.status === true){
          fetch("http://192.168.43.156:3000/api/getCol").then(
            (responseI) => responseI.json()).then(
              (responseIJSON) => {
                if(responseIJSON.status === true) {
                  navigation.replace('SignedIn', {
                  "user_id": responseOJSON.user_id,
                  "userName": responseOJSON.userName,
                  "daysLeft" : responseOJSON.daysLeft,
                  "collection": responseIJSON.collection
                })
                } else {
                  navigation.replace('Signup')
                  console.log("Inner fetch compromised");
            }}).catch((error) => {console.log(error)});
          }else{
            navigation.replace('Signup')
            console.log("Outer fetch compromised");
          }
        })
        .catch(error => console.log(error)) 
        });
  }, []);

  return (
    <LottiePreloader />
  );
};

export default SplashScreen;