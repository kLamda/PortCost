// components/login.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from './loader'
import { Dimensions } from 'react-native';

export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      dimension: Dimensions.get('window'),
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
    let dataToSend = {email: this.state.email, password: this.state.password};
    fetch("http://192.168.43.156:3000/api/login", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }).then((responseO) => responseO.json())
    .then((responseOJSON) => {
        if(responseOJSON.status === true) {
          fetch("http://192.168.43.156:3000/api/getCol").then(
            (responseI) => responseI.json()).then(
              (responseIJSON) => {
                if(responseIJSON.status === true) {
                  this.setState({
                    isLoading: false,
                    email: '', 
                    password: ''
                  });
                  AsyncStorage.setItem('user_id', responseOJSON.user_id);
                  this.props.navigation.navigate('SignedIn', {
                    "user_id": responseOJSON.user_id,
                    "userName": responseOJSON.userName,
                    "daysLeft" : responseOJSON.daysLeft,
                    "collection" : responseIJSON.collection
                  })
                }else{
                navigation.replace('Signup')
                console.log("Inner fetch compromised");
              }
            }
          )
        } else {
          Alert.alert('Invalid email or password!')
          this.props.navigation.navigate('Login')
        }
      })
      .catch(error => console.log(error))
        // this.setState({ errorMessage: error.message })
    }
  }

  render() { 
    return (
      <View style={styles.container}> 
        <Loader loading={this.state.isLoading} /> 
        <Image style={[styles.topImage, {width: this.state.dimension.width}]} source={require("../assets/top1.png")} />
        <Image style={[styles.topImage, {width: this.state.dimension.width}]} source={require("../assets/top2.png")} />
        <Image style={[styles.bottomImage, {width: this.state.dimension.width}]} source={require("../assets/bottom1.png")} />
        <Image style={[styles.bottomImage, {width: this.state.dimension.width}]} source={require("../assets/bottom2.png")} />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Signin"
          onPress={() => this.userLogin()}
        />   

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  topImage:{
    position: "absolute",
    top: 0,
    right: 0,
    resizeMode: "stretch",
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
    resizeMode: "stretch",
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});