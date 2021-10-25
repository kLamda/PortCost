import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottiePreloader from './lottieLoader';
import { Alert } from 'react-native';
import { HOST } from './host';

const SplashScreen = ({navigation}) => {
  useEffect( () => {
    AsyncStorage.getItem('user_id').then((value) =>{
      fetch(`${HOST}/api/getTime`, {
        method: "POST",
        body: JSON.stringify({"user_id": value}),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((responseO) => responseO.json())
      .then((responseOJSON) => {
        if(responseOJSON.status === true){
              navigation.replace('SignedIn', {
              "user_id": responseOJSON.user_id,
              "userName": responseOJSON.userName,
              "daysLeft" : responseOJSON.daysLeft,
              "email" : responseOJSON.userEmail,
              "phone" : responseOJSON.phone,
              "isVesAgent" : responseOJSON.isVesAgent,
              "isExpImp" : responseOJSON.isExpImp,
              "isStevedore" : responseOJSON.isStevedore,
            })    
          }else{
            if(responseOJSON.status === "over") {
              Alert.alert("Your account has expired. Please contact the administrator.");
            }
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