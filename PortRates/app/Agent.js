import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, StatusBar, Pressable, ScrollView, TextInput, Alert } from "react-native";
import DropDownPicker from "react-native-custom-dropdown";
import {ForeignParadeep, CoastalParadeep, VesselGopalapur} from "./helper.js";
import { HOST } from "./host.js";
import Loader from "./loader.js";

class Agent extends React.Component {

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
          checkBtn9: false,
          checkBtn10: false,
          checkBtn11: false,
          checkBtn12: false,
          checkBtn13: false,
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
          AncHrs: null,
          PilCanc: null,
          Tug: 0,
          PilDetHrs: 0,
          TugHrs: 0,
          PenBerthHrs: 0,
          Coll: 0,
          Bill: 0,
          Inc : 0,
          WtrUsg : 0
        }
    }

    clickBtn = (btn) => {
      if(btn === 0) {this.setState({checkBtn1: !this.state.checkBtn1})} 
      else if(btn === 1) {this.setState({checkBtn2: !this.state.checkBtn2})} 
      else if(btn === 2) {this.setState({checkBtn3: !this.state.checkBtn3})} 
      else if(btn === 3) {this.setState({checkBtn4: !this.state.checkBtn4})} 
      else if(btn === 4) {this.setState({checkBtn5: !this.state.checkBtn5})} 
      else if(btn === 5) {this.setState({checkBtn6: !this.state.checkBtn6})} 
      else if(btn === 6) {this.setState({checkBtn7: !this.state.checkBtn7})}
      else if(btn === 7) {this.setState({checkBtn8: !this.state.checkBtn8})}
      else if(btn === 8) {this.setState({checkBtn9: !this.state.checkBtn9})}
      else if(btn === 9) {this.setState({checkBtn10: !this.state.checkBtn10})}
      else if(btn === 10) {this.setState({checkBtn11: !this.state.checkBtn11})}
      else if(btn === 11) {this.setState({checkBtn12: !this.state.checkBtn12})}
      else if(btn === 12) {this.setState({checkBtn13: !this.state.checkBtn13})}
    };
    
    returnClickColor = (btn) => {
      if(btn === 0) {return this.state.checkBtn1 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 1) {return this.state.checkBtn2 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 2) {return this.state.checkBtn3 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 3) {return this.state.checkBtn4 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 4) {return this.state.checkBtn5 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 5) {return this.state.checkBtn6 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 6) {return this.state.checkBtn7 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 7) {return this.state.checkBtn8 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 8) {return this.state.checkBtn9 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 9) {return this.state.checkBtn10 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 10) {return this.state.checkBtn11 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 11) {return this.state.checkBtn12 ? '#7EA1FB' :'#D7E2FE';}
      else if(btn === 12) {return this.state.checkBtn13 ? '#7EA1FB' :'#D7E2FE';}
    }

    validButton = (port, calc) => {
      if(port=="Paradeep" && calc=="Coastal" || calc=="Foreign"){
        return [
          {0: "Port Dues", 1: "Pilotage/Towage"},
          {2: "Berth Hire", 3: "Water Charge"},
          {4: "Cancellation", 5: "Garbage"},
          {6: "SGST", 7: "CGST"}]
      } else if(port=="Gopalapur" && calc=="Vessel"){
        return [
          {0: "Vessel Charges", 1: "Shifting"},
          {2: "Warping", 3: "Anchorage"},
          {4: "Cancellation", 5: "Detention"},
          {6: "Tug Hire", 7: "Berth Hire"},
          {8: "Cold Move", 9: "Garbage"},
          {10: "Chandling", 11: "Penanlty"},
          {12: "Wharfage"}
        ]
      }
    }

    render() {
      let DollarVal = 74.43;
      let CGST = this.state.checkBtn8 ? 0.09 : 0;
      let SGST = this.state.checkBtn7 ? 0.09 : 0;
      let btnData = this.validButton(this.state.portType, this.state.calcType);
      
      submit = () => {
        let btnCheck = [this.state.checkBtn1, this.state.checkBtn2, this.state.checkBtn3, this.state.checkBtn4, this.state.checkBtn5, this.state.checkBtn6, this.state.checkBtn7, this.state.checkBtn8];
        let inputCheck = [this.state.Hours, this.state.WaterUSG, this.state.shifts, this.state.cancellations, this.state.Garbage, this.state.LGRT, this.state.HGRT];
        let inputChecker = inputCheck.some(item => item < 0);
        let btnChecker = btnCheck.some(item => item == true);
        if(this.state.portType == "Paradeep"){
          if(inputChecker){
            Alert.alert("Please provide valid input values");
          } else if(btnChecker == false) {
            Alert.alert("Please select any button");
          } else if(this.state.checkBtn4 == true && this.state.waterChargeType == null) {
            Alert.alert("Please select Water Charge Type");
          } else{
          if(this.state.calcType=="Foreign") {
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
            } else if (this.state.calcType == "Coastal"){
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
        } else if(this.state.portType == "Gopalapur"){
          let finalResult = VesselGopalapur(
            this.state.checkBtn1,
            this.state.checkBtn2 ? this.state.shifts : 0,
            this.state.checkBtn3,
            this.state.HGRT,
            this.state.checkBtn4 ? this.state.AncHrs : 0,
            this.state.checkBtn5 ? this.state.PilCanc : 0,
            this.state.Tug,
            this.state.checkBtn6 ? this.state.PilDetHrs : 0,
            this.state.checkBtn7 ? this.state.TugHrs : 0,
            this.state.checkBtn8 ? this.state.PenBerthHrs : 0,
            this.state.checkBtn9,
            this.state.checkBtn10 ? this.state.Coll : 0,
            this.state.checkBtn11 ? this.state.Bill : 0,
            this.state.checkBtn12 ? this.state.Inc : 0,
            this.state.checkBtn13 ? this.state.WtrUsg : 0,
            DollarVal
          );
          this.props.navigation.navigate('Result', {value: finalResult});
        }
      }
      
      return (
        <ScrollView style={styles.container}>
          <Loader loading={this.state.isLoading} />
          <View style={styles.inputContainer}>
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
                this.setState({isLoading: true, portType : item.value, calcType: null, calcCollection: null});
                fetch(`${HOST}/api/getDoc/${item.value}`).then(
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
          </View>
          {this.state.portType!= null && this.state.calcType!= null ?
          <View style={styles.btnContainer}>
            {btnData.map((item, index) => (
              <View key={index} style={styles.btnRow}>
                {(item[index*2] != null) ? 
                <View style={styles.btnColumn}>
                  <Pressable style={[styles.btn, {backgroundColor: this.returnClickColor(index*2)}]} onPress={() => this.clickBtn(index*2)} >
                    <Text style={styles.btnText}>{item[index*2]}</Text>
                  </Pressable>
                </View> : null}
                {(item[index*2+1] != null) ? 
                <View style={styles.btnColumn}>
                  <Pressable style={[styles.btn, {backgroundColor: this.returnClickColor(index*2+1)}]} onPress={() => this.clickBtn(index*2+1)} >
                    <Text style={styles.btnText}>{item[index*2 +1]}</Text>
                  </Pressable>
                </View> : null}
              </View>
            ))}
          </View>
          :null}
          <View style={styles.inputContainer}>
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input HGRT value"
                keyboardType="numeric"
                onChangeText={HGRT => this.setState({HGRT})}
              />
            </View>
            {this.state.calcType != null && this.state.portType== "Paradeep" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input LGRT value"
                keyboardType="numeric"
                onChangeText={LGRT => this.setState({LGRT})}
              />
            </View>:null}
            {this.state.checkBtn2 ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Number of Shifting"
                keyboardType="numeric"
                onChangeText={shifts => this.setState({shifts})}
              />
            </View>
            :null}
            {this.state.checkBtn3 && this.state.portType== "Paradeep" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Hours"
                keyboardType="numeric"
                onChangeText={Hours => this.setState({Hours})}
              />
            </View>:null}
            {this.state.checkBtn4 && this.state.portType== "Paradeep"  ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Water Usage"
                keyboardType="numeric"
                onChangeText={WaterUSG => this.setState({WaterUSG})}
              />
            </View> : null}
            
            {this.state.checkBtn4 && this.state.portType== "Paradeep" ?
            <DropDownPicker
              items={[{label: "Direct Supply at Berth", value: 0}, {label: "Supply by barges at jetty", value: 1}, {label: "Supply by charges at an charge", value: 2}]}
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
            {this.state.checkBtn5 && this.state.portType== "Paradeep"  ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Cancellation amount"
                keyboardType="numeric"
                onChangeText={cancellations => this.setState({cancellations})}
              />
            </View>:null}
            {this.state.checkBtn4 && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Anchorage Hrs"
                keyboardType="numeric"
                onChangeText={AncHrs => this.setState({AncHrs})}
              />
            </View> : null}
            {this.state.checkBtn5 && this.state.portType== "Gopalapur" ?
            <DropDownPicker
              items={[{label: "500", value: 500}, {label: "1000", value: 1000}]}
              containerStyle={{height: 43, width: "90%", marginBottom: 20}}
              itemStyle={{
                  justifyContent: 'center',
              }}
              labelStyle={{
                  fontSize: 16,
                  color: '#000'
              }}
              dropDownStyle={{backgroundColor: '#D7E2FE'}}
              placeholder= "Select Pilot Cancellation Type"
              onChangeItem = {item => this.setState({PilCanc: item.value})}
            />:null}
            {(this.state.checkBtn6 || this.state.checkBtn7) && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Enter TUG"
                keyboardType="numeric"
                onChangeText={Tug => this.setState({Tug})}
              />
            </View>:null}
            {this.state.checkBtn6 && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Enter Pilot Detention Hours"
                keyboardType="numeric"
                onChangeText={PilDetHrs => this.setState({PilDetHrs})}
              />
            </View>:null}
            {this.state.checkBtn7 && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Enter TUG Hire Hours"
                keyboardType="numeric"
                onChangeText={TugHrs => this.setState({TugHrs})}
              />
            </View>:null}
            {this.state.checkBtn8 && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Enter Penal Berth Hire Hours"
                keyboardType="numeric"
                onChangeText={PenBerthHrs => this.setState({PenBerthHrs})}
              />
            </View>:null}
            {this.state.checkBtn10 && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Enter number of Collection"
                keyboardType="numeric"
                onChangeText={Coll => this.setState({Coll})}
              />
            </View>:null}
            {this.state.checkBtn11 && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Enter number of Bills"
                keyboardType="numeric"
                onChangeText={Bill => this.setState({Bill})}
              />
            </View>:null}
            {this.state.checkBtn12 && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Enter number of Incidents"
                keyboardType="numeric"
                onChangeText={Inc => this.setState({Inc})}
              />
            </View>:null}
            {this.state.checkBtn13 && this.state.portType== "Gopalapur" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Enter Water Usage"
                keyboardType="numeric"
                onChangeText={WtrUsg => this.setState({WtrUsg})}
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


export default Agent;