import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import LottiePreloader from './lottieLoader';
import { Alert } from 'react-native';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user_id').then((value) =>{
      fetch("http://192.168.43.156:3000/api/getTime", {
        method: "POST",
        body: JSON.stringify({"user_id": value}),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((response) => response.json())
      .then((responseJSON) => {
          if(responseJSON.status === true) {
            navigation.replace('SignedIn', {
            "user_id": responseJSON.user_id,
            "userName": responseJSON.userName,
            "daysLeft" : responseJSON.daysLeft
          })
          } else {
            navigation.replace('Signup')
            Alert.alert(responseJSON.message)
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