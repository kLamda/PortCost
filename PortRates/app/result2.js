import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, StatusBar, Pressable, ScrollView, TextInput } from "react-native";
import DropDownPicker from "react-native-custom-dropdown";
import {ForeignParadeep} from "./helper.js";

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
          waterChargeType : null,
          shifts: 0,
          cancellations: 0,
          Garbage: 0,
          SGST: 0,
          CGST: 0
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
      let DollarVal = 20;
      let portType = null;
      let calcType = null;
      let choosePortDues = this.state.checkBtn1 ? true : false;
      let choosePilotage = this.state.checkBtn2 ? true : false;
      let ChooseBirthHire = this.state.checkBtn3 ? true : false;
      let Garbage = this.state.checkBtn6 ? true : false;
      let CGST = this.state.checkBtn8 ? true : false;
      let SGST = this.state.checkBtn7 ? true : false;
      submit = () => {
        let finalResult = ForeignParadeep(
          choosePortDues,
          choosePilotage,
          ChooseBirthHire,
          this.state.HGRT, 
          this.state.shifts, 
          this.state.Hours, 
          this.state.WaterUSG, 
          this.state.waterChargeType, 
          this.state.cancellations, 
          Garbage, 
          SGST, 
          CGST, 
          DollarVal);
          console.log(finalResult);
          this.props.navigation.navigate('Result', {value: finalResult});
          // console.log({
          //   HGRT: this.state.HGRT,
          //   shifts: this.state.shifts,
          //   Hours: this.state.Hours,
          //   WaterUSG: this.state.WaterUSG,
          //   waterChargeType: this.state.waterChargeType,
          //   cancellations: this.state.cancellations,
          //   Garbage: this.state.Garbage,
          //   SGST: this.state.SGST,
          //   CGST: this.state.CGST,
          //   DollarVal: DollarVal,
          //   portType: portType,
          //   calcType: calcType
          // })
      }
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
              onChangeItem = {item => {calcType = item.value;}}
            />
            <DropDownPicker
              items={[{label: "Paradeep", value: 0}, {label: "Port Blair", value: 1}]}
              containerStyle={{height: 43, width: "90%", marginBottom: 20}}
              itemStyle={{
                  justifyContent: 'center',
              }}
              labelStyle={{
                  fontSize: 16,
                  color: '#000'
              }}
              dropDownStyle={{backgroundColor: '#D7E2FE'}}
              placeholder= "Select Port"
              onChangeItem = {item => {portType = item.value;}}
            />
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input HGRT value"
                keyboardType="numeric"
                onChangeText={HGRT => this.setState({HGRT})}
              />
            </View>
            {this.state.checkBtn2?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Number of Shifting"
                keyboardType="numeric"
                onChangeText={shifts => this.setState({shifts})}
              />
            </View>
            :null}
            {this.state.checkBtn3 ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Hours"
                keyboardType="numeric"
                onChangeText={Hours => this.setState({Hours})}
              />
            </View>:null}
            {this.state.checkBtn4 ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Water Usage"
                keyboardType="numeric"
                onChangeText={WaterUSG => this.setState({WaterUSG})}
              />
            </View> : null}
            
            {this.state.checkBtn4 ?
            <DropDownPicker
              items={[{label: "Direct Supply at Birth", value: 0}, {label: "Supply by barges at jetty", value: 1}, {label: "Supply by charges at an charge", value: 2}]}
              containerStyle={{height: 43, width: "90%", marginBottom: 20}}
              itemStyle={{
                  justifyContent: 'center',
              }}
              labelStyle={{
                  fontSize: 16,
                  color: '#000'
              }}
              dropDownStyle={{backgroundColor: '#D7E2FE'}}
              placeholder= "Select Water Charge Type      "
              onChangeItem = {item => this.setState({waterChargeType: item.value})}
            />: null}
            {this.state.checkBtn5 ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Cancellation amount"
                keyboardType="numeric"
                onChangeText={cancellations => this.setState({cancellations})}
              />
            </View>:null}
            <TouchableOpacity style={styles.proceedBtn} onPress={submit}>
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
    marginBottom: 10,
    marginTop: 10,
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