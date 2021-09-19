import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, StatusBar, Pressable, ScrollView, TextInput } from "react-native";
import DropDownPicker from "react-native-custom-dropdown";


class Try extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          checkBtn1: false,
          checkBtn2: false,
          checkBtn3: false,
          checkBtn4: false,
          checkBtn5: false,
          checkBtn6: false,
          checkBtn7: false,
          checkBtn8: false,
          HGRT: 0,
          Hours: 0,
          WaterUSG: 0,
      }
    }
    
    list = () => {
      return this.state.btnDetails.map((element, key) => {
        return (
          <View key={key} style={styles.btnRow}>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: element.checkBtnLeft ? '#ff0000' : '#00ff00'}]} onPress={element.leftBtnOnPress}>
                  <Text style={styles.btnText}>{element.leftBtnTitle}</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor:this.state.checkBtn2 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn2: !prevState.checkBtn2
                    }));
                  }} >
                  <Text style={styles.btnText}>{element.rightBtnTitle}</Text>
                </Pressable>
              </View>
            </View>
        );
      });
    };

    render() {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.btnContainer}>
            <View style={styles.btnRow}>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn1 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn1: !prevState.checkBtn1
                    }));
                  }} >
                  <Text style={styles.btnText}>Port Dues</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn2 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn2: !prevState.checkBtn2
                    }));
                  }} >
                  <Text style={styles.btnText}>Pilotage/Towage</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.btnRow}>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn3 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn3: !prevState.checkBtn3
                    }));
                  }} >
                  <Text style={styles.btnText}>Berth Hire</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn4 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn4: !prevState.checkBtn4
                    }));
                  }} >
                  <Text style={styles.btnText}>Water Charge</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.btnRow}>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn5 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn5: !prevState.checkBtn5
                    }));
                  }} >
                  <Text style={styles.btnText}>Cancellation</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn6 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn6: !prevState.checkBtn6
                    }));
                  }} >
                  <Text style={styles.btnText}>Garbage</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.btnRow}>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn7 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn7: !prevState.checkBtn7
                    }));
                  }} >
                  <Text style={styles.btnText}>SGST</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn8 ? '#ff0000' : '#00ff00'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn8: !prevState.checkBtn8
                    }));
                  }} >
                  <Text style={styles.btnText}>CGST</Text>
                </Pressable>
              </View>
            </View>
          </View> 
          <View style={styles.inputContainer}>
            <DropDownPicker
              items={[{label: "Foreign", value: 0}, {label: "Coastal", value: 1}]}
              containerStyle={{height: 43, width: "90%", marginBottom: 20, zIndex: 10}}
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
              items={[{label: "Foreign", value: 0}, {label: "Coastal", value: 1}]}
              containerStyle={{height: 43, width: "90%", marginBottom: 20}}
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
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input HGRT value"
                keyboardType="numeric"
                onChangeText={HGRT => this.setState({HGRT})}
              />
            </View>
            <View style={[styles.inputText, {display: this.state.checkBtn3 ? 'flex' : 'none'}]}>
              <TextInput
                style={styles.input}
                placeholder="Input Hours"
                keyboardType="numeric"
                onChangeText={Hours => this.setState({Hours})}
              />
            </View>
            <View style={[styles.inputText, {display: this.state.checkBtn4 ? 'flex' : 'none'}]}>
              <TextInput
                style={styles.input}
                placeholder="Input Water Usage"
                keyboardType="numeric"
                onChangeText={Hours => this.setState({Hours})}
              />
            </View>
            
            <DropDownPicker
              items={[{label: "Foreign", value: 0}, {label: "Coastal", value: 1}]}
              containerStyle={{height: 43, width: "90%", marginBottom: 20, zIndex: 10}}
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
            <TouchableOpacity style={styles.proceedBtn}>
              <Text style={styles.btnText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  inputText: {
    width: "90%",
    marginBottom: 10,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
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
  },
  btnContainer: {
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    marginTop:StatusBar.currentHeight,
    padding: 10,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    width: "90%",
    height: 50,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  btnRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  btnColumn: {
    width: "50%",
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});


export default Try;