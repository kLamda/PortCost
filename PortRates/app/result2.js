import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, StatusBar, Pressable, ScrollView, TextInput, Alert } from "react-native";
import DropDownPicker from "react-native-custom-dropdown";
import {ForeignParadeep, CoastalParadeep} from "./helper.js";
import Loader from "./loader.js";

class Try extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          collections: this.props.route.params.collection.map(item => {return {label: item, value: item}}),
          calcCollection: null,
          checkBtn1: false,
          checkBtn2: false,
          checkBtn3: false,
          checkBtn4: false,
          checkBtn5: false,
          checkBtn6: false,
          checkBtn7: false,
          checkBtn8: false,
          HGRT: 0,
          LGRT: 0,
          Hours: 0,
          WaterUSG: 0,
          waterChargeType : null,
          shifts: 0,
          cancellations: 0,
          Garbage: 0,
          SGST: 0,
          CGST: 0,
          isLoading: false,
          portType: null,
          calcType: null,
          btnOptions: [{title: "CheckBtn1", val: false}, {title: "CheckBtn2", val: false}, {title: "CheckBtn3", val: false}, {title: "CheckBtn4", val: false}, {title: "CheckBtn5", val: false}, {title: "CheckBtn6", val: false}, {title: "CheckBtn7", val: false}, {title: "CheckBtn8", val: false}],
      }
    }

    render() {
      let DollarVal = 74.43;
      let CGST = this.state.checkBtn8 ? 0.09 : 0;
      let SGST = this.state.checkBtn7 ? 0.09 : 0;
      
      submit = () => {
        let arr = [this.state.portType, this.state.calcType, this.state.HGRT];
        let btnCheck = [this.state.checkBtn1, this.state.checkBtn2, this.state.checkBtn3, this.state.checkBtn4, this.state.checkBtn5, this.state.checkBtn6, this.state.checkBtn7, this.state.checkBtn8];
        let valChecker = arr.every(item => item != null && item != 0);
        let btnChecker = btnCheck.some(item => item == true);
        if(valChecker == false) {
          Alert.alert("Please provide input values");
        } else if(btnChecker == false) {
          Alert.alert("Please select any button");
        } else if(this.state.checkBtn4 == true && this.state.waterChargeType == null) {
          Alert.alert("Please select Water Charge Type");
        } else{
        if(this.state.portType=="Paradeep" && this.state.calcType=="Foreign") {
          let finalResult = ForeignParadeep(
            this.state.checkBtn1,
            this.state.LGRT,
            this.state.HGRT, 
            this.state.checkBtn2,
            this.state.checkBtn2 ? this.state.shifts : 0, 
            this.state.checkBtn3 ? this.state.Hours : 0, 
            this.state.checkBtn4 ? this.state.WaterUSG : 0, 
            this.state.checkBtn4 ? this.state.waterChargeType : 0, 
            this.state.checkBtn5 ? this.state.cancellations : 0,
            this.state.checkBtn6 ? 1000 : 0, 
            SGST, 
            CGST, 
            DollarVal);
            this.props.navigation.navigate('Result', {value: finalResult});
          } else if (this.state.portType=="Paradeep" && this.state.calcType == "Coastal"){
            let finalResult = CoastalParadeep(
            this.state.checkBtn1,
            this.state.LGRT,
            this.state.HGRT, 
            this.state.checkBtn2,
            this.state.checkBtn2 ? this.state.shifts : 0, 
            this.state.checkBtn3 ? this.state.Hours : 0, 
            this.state.checkBtn4 ? this.state.WaterUSG : 0, 
            this.state.checkBtn4 ? this.state.waterChargeType : 0, 
            this.state.checkBtn5 ? this.state.cancellations : 0, 
            this.state.checkBtn6 ? 500 : 0, 
            SGST,
            CGST, 
            DollarVal);
            this.props.navigation.navigate('Result', {value: finalResult});
          }
        } 
      }
      
      return (
        <ScrollView style={styles.container}>
          <Loader loading={this.state.isLoading} />
          <View style={styles.btnContainer}>
            <View style={styles.btnRow}>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn1 ? '#7EA1FB' :'#D7E2FE'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn1: !prevState.checkBtn1
                    }));
                  }} >
                  <Text style={styles.btnText}>Port Dues</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn2 ? '#7EA1FB' :'#D7E2FE'}]} onPress={() => {
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
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn3 ? '#7EA1FB' :'#D7E2FE'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn3: !prevState.checkBtn3
                    }));
                  }} >
                  <Text style={styles.btnText}>Berth Hire</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn4 ? '#7EA1FB' :'#D7E2FE'}]} onPress={() => {
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
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn5 ? '#7EA1FB' :'#D7E2FE'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn5: !prevState.checkBtn5
                    }));
                  }} >
                  <Text style={styles.btnText}>Cancellation</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn6 ? '#7EA1FB' :'#D7E2FE'}]} onPress={() => {
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
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn7 ? '#7EA1FB' :'#D7E2FE'}]} onPress={() => {
                  this.setState(prevState => ({
                    checkBtn7: !prevState.checkBtn7
                    }));
                  }} >
                  <Text style={styles.btnText}>SGST</Text>
                </Pressable>
              </View>
              <View style={styles.btnColumn}>
                <Pressable style={[styles.btn, {backgroundColor: this.state.checkBtn8 ? '#7EA1FB' :'#D7E2FE'}]} onPress={() => {
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
            {this.state.checkBtn1 ?
            this.state.btnOptions.map((item, index) => {
              return (
                <View key={index}>
                  <Text>
                  {item.title}
                  </Text>
                </View>

              )}):null}
            <DropDownPicker
              items={this.state.collections}
              containerStyle={{height: 43, width: "90%", marginBottom: 20}}
              itemStyle={{
                  justifyContent: 'center',
              }}
              labelStyle={{
                  fontSize: 16,
                  color: '#000'
              }}
              dropDownStyle={{backgroundColor: '#D7E2FE'}}
              placeholder= "Select Port Type"
              onChangeItem = {item => {
                this.setState({isLoading: true, portType : item.value});
                fetch(`http://portrates.herokuapp.com/api/getDoc/${item.value}`).then(
                  response => response.json()).then(responseJson => {
                    this.setState({
                      isLoading: false,
                      calcCollection: responseJson.map(item => {return {label: item.title, value: item.title}}),
                    });
                  }).catch(error => {
                    console.log(error);
                  });
              }}
            />
            {this.state.calcCollection!==null ?
            <DropDownPicker
              items={this.state.calcCollection}
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
              onChangeItem = {item => {this.setState({calcType :item.value});}}
            /> : null }
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input HGRT value"
                keyboardType="numeric"
                onChangeText={HGRT => this.setState({HGRT})}
              />
            </View>
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input LGRT value"
                keyboardType="numeric"
                onChangeText={LGRT => this.setState({LGRT})}
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
    color: '#333',
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