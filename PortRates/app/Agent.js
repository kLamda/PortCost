import React from "react";
import { RefreshControl ,TouchableOpacity, View, Text, StyleSheet, StatusBar, Pressable, ScrollView, TextInput, Alert } from "react-native";
import DropDownPicker from "react-native-custom-dropdown";
import {ForeignParadeep, CoastalParadeep, VesselGopalapur, TamilNadu, NewMangalore} from "./helper.js";
import Loader from "./loader.js";
import SelectBox from "react-native-multi-selectbox";
import {xorBy} from "lodash";

class Agent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          // collections: this.props.route.params.collection.map(item => {return {label: item, value: item}}),
          collections: [
            {label: "Paradeep", value:"Paradeep"}, 
            {label: "Gopalapur", value:"Gopalapur"}, 
            {label: "Tamil Nadu", value:"Tamil Nadu"},
            {label: "Cochin", value:"Cochin"},
            {label: "Kolkata", value:"Kolkata"},
            {label: "Visakapatnam", value:"Visakapatnam"},
            {label: "Chennai", value: "Chennai"},
            {label: "New Mangalore", value: "New Mangalore"},
          ],
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
          WtrUsg : 0,
          pDueChoice : 0,
          subSelectedItems: [],
          mangaloreInput : {}
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
      if(port=="Paradeep" && (calc=="Coastal" || calc=="Foreign")){
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
          {10: "Chandling", 11: "Penanlty"}
        ]
      } else if(port=="Tamil Nadu" && (calc=="Foreign" || calc=="Coastal")){
        return [
          {0: "Port Dues", 1: "Berth Hire"},
          {2: "Pilotage Fee", 3: "Shifting Charge"},
          {4: "SGST", 5: "CGST"},
          {6: "Anchorage"}]
      } else if(port=="New Mangalore" && (calc=="Foreign" || calc=="Coastal")){
        return [
          {0: "Port Dues", 1: "Berth Hire"},
          {2: "Pilotage Fee", 3: "Shifting Charge"},
          {4: "Detention Charge", 5: "Tug Hire Charges"},
          {6: "Anchorage"}
        ]
      }
    }

    onMultiChange() {
      return (item) => this.setState({subSelectedItems: xorBy(this.state.subSelectedItems, [item], 'id')});
    }

    getArr(arr){
      return Array.from(arr, x => x.id);
    }

    render() {
      let DollarVal = 74.43;
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
              this.state.checkBtn7 ? 0.09 : 0, 
              this.state.checkBtn8 ? 0.09 : 0, 
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
              this.state.checkBtn7 ? 0.09 : 0, 
              this.state.checkBtn8 ? 0.09 : 0,  
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
        } else if(this.state.portType=="Tamil Nadu"){
          let finalResult = TamilNadu(
            this.state.checkBtn1 ? this.state.pDueChoice : null,
            this.state.HGRT,
            this.state.checkBtn2,
            this.state.checkBtn3,
            this.state.checkBtn4,
            this.state.checkBtn7 ? this.state.AncHrs : 0,
            this.state.checkBtn5 ? 0.09 : 0,
            this.state.checkBtn6 ? 0.09 : 0,
            DollarVal,
            this.state.calcType
          );
          this.props.navigation.navigate('Result', {value: finalResult});
          // console.log(finalResult);
        } else if(this.state.portType==="New Mangalore"){
          console.log("input", this.state.checkBtn1 ? this.state.mangaloreInput.PortDueChoice : false,
            this.state.HGRT,
            this.state.checkBtn2 ? this.state.mangaloreInput.BerthHireChoice : false,
            this.state.mangaloreInput.hasOwnProperty('subBerthHireChoice') ? this.state.mangaloreInput.subBerthHireChoice : false,
            this.state.checkBtn2 ? this.state.mangaloreInput.BerthHrs : 0,
            this.state.mangaloreInput.hasOwnProperty('BerthVsslNo') ? this.state.mangaloreInput.BerthVsslNo : 0,
            this.state.checkBtn3 ? this.getArr(this.state.mangaloreInput.PilotageChoice) : [],
            this.state.mangaloreInput.hasOwnProperty('PilotageVsslNo') ? this.state.mangaloreInput.PilotageVsslNo : 0,
            this.state.checkBtn4 ? this.getArr(this.state.mangaloreInput.ShiftingChoice) : [],
            this.state.mangaloreInput.hasOwnProperty('ShiftingVsslNo') ? this.state.mangaloreInput.ShiftingVsslNo : 0,
            this.state.checkBtn5 ? this.state.mangaloreInput.DetentionCharge : null,
            this.state.checkBtn6 ? this.state.mangaloreInput.TugHireCharge : null,
            this.state.checkBtn7 ? this.state.mangaloreInput.AncChoice : false,
            this.state.checkBtn7 > 0 ? this.state.mangaloreInput.AncHrs : 0,
            DollarVal,
            this.state.calcType);
          let finalResult = NewMangalore(
            this.state.checkBtn1 ? this.state.mangaloreInput.PortDueChoice : false,
            this.state.HGRT,
            this.state.checkBtn2 ? this.state.mangaloreInput.BerthHireChoice : false,
            this.state.mangaloreInput.hasOwnProperty('subBerthHireChoice') ? this.state.mangaloreInput.subBerthHireChoice : false,
            this.state.checkBtn2 ? this.state.mangaloreInput.BerthHrs : 0,
            this.state.mangaloreInput.hasOwnProperty('BerthVsslNo') ? this.state.mangaloreInput.BerthVsslNo : 0,
            this.state.checkBtn3 ? this.getArr(this.state.mangaloreInput.PilotageChoice) : [],
            this.state.mangaloreInput.hasOwnProperty('PilotageVsslNo') ? this.state.mangaloreInput.PilotageVsslNo : 0,
            this.state.checkBtn4 ? this.getArr(this.state.mangaloreInput.ShiftingChoice) : [],
            this.state.mangaloreInput.hasOwnProperty('ShiftingVsslNo') ? this.state.mangaloreInput.ShiftingVsslNo : 0,
            this.state.checkBtn5 ? this.state.mangaloreInput.DetentionCharge : null,
            this.state.checkBtn6 ? this.state.mangaloreInput.TugHireCharge : null,
            this.state.checkBtn7 ? this.state.mangaloreInput.AncChoice : false,
            this.state.checkBtn7 > 0 ? this.state.mangaloreInput.AncHrs : 0,
            DollarVal,
            this.state.calcType
          );
          this.props.navigation.navigate('Result', {value: finalResult});
        }
      }
      
      return ( 
        <ScrollView style={styles.container} refreshControl={
          <RefreshControl
            onRefresh={() => this.props.navigation.navigate('Splash')}
            />
          }>
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
                let cCol = null;
                if(item.value === "Paradeep" || item.value === "Tamil Nadu" || item.value === "Cochin" || item.value === "Kolkata" || item.value === "Visakapatnam" || item.value === "Chennai" || item.value == "New Mangalore" ){
                  cCol = [{label: "Foreign", value: "Foreign"}, {label: "Coastal", value: "Coastal"}];
                } else if(item.value === "Gopalapur"){
                  cCol = [{label: "Vessel", value: "Vessel"}];
                }
                this.setState({isLoading: false, calcCollection: cCol});
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
            {this.state.checkBtn2 &&(this.state.portType=='Paradeep' || this.state.portType=='Gopalapur') ?
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
            {this.state.checkBtn7 && this.state.portType== "Tamil Nadu" ?
            <View style={styles.inputText}>
              <TextInput
                style={styles.input}
                placeholder="Input Anchorage Hrs"
                keyboardType="numeric"
                onChangeText={AncHrs => this.setState({AncHrs})}
              />
            </View> : null}
            {this.state.checkBtn1 && this.state.portType== "Tamil Nadu" ?
            <DropDownPicker
              items={[{label: "Ship/Streamers", value: 0}, {label: "Sailing", value: 1}]}
              containerStyle={{height: 43, width: "90%", marginBottom: 20}}
              itemStyle={{
                  justifyContent: 'center',
              }}
              labelStyle={{
                  fontSize: 16,
                  color: '#000'
              }}
              dropDownStyle={{backgroundColor: '#D7E2FE'}}
              placeholder= "Enter Port Due choice"
              onChangeItem = {item => this.setState({pDueChoice: item.value})}
            />:null}
            {this.state.portType=="New Mangalore" && <>
              {this.state.checkBtn1 && <DropDownPicker
                items={[
                  {label: "Ship/Streamers", value: 0}, 
                  {label: "Tugs/Launches/Sailing vessel/Barges", value: 1}, 
                  {label: "Crude Oil Tanker at SPM", value: 2},
                  {label: "Bunker Barge", value: 3},
                  {label: "Vessel Calling for bunkering ar Berth", value: 4},
                  {label: "Vessel Calling for bunkering at Anchorage", value: 5},
                ]}
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
                onChangeItem = {item => {
                  let obj = this.state.mangaloreInput;
                  obj['PortDueChoice'] = item.value;
                  this.setState({mangaloreInput :obj});
                }}
                />}
                
                {this.state.checkBtn2 && <DropDownPicker
                items={[
                  {label: "Vessel", value: 0}, 
                  {label: "Oil Tanker", value: 1}
                ]}
                containerStyle={{height: 43, width: "90%", marginBottom: 20}}
                itemStyle={{
                    justifyContent: 'center',
                }}
                labelStyle={{
                    fontSize: 16,
                    color: '#000'
                }}
                dropDownStyle={{backgroundColor: '#D7E2FE'}}
                placeholder= "Enter Berth Hire Choice"
                onChangeItem = {item => {
                  let obj = this.state.mangaloreInput;
                  obj['BerthHireChoice'] = item.value;
                  this.setState({mangaloreInput :obj});
                }}
                />}

                {this.state.mangaloreInput.hasOwnProperty['BerthHireChoice'] && <TextInput
                    style={styles.input}
                    placeholder="Enter Berth Hours"
                    keyboardType="numeric"
                    onChangeText={BerthHrs => {
                      let obj = this.state.mangaloreInput;
                      obj['BerthHrs'] = BerthHrs;
                      this.setState({mangaloreInput :obj});
                    }}
                    />}

                {this.state.mangaloreInput.hasOwnProperty('BerthHireChoice') && this.state.mangaloreInput.BerthHireChoice == 1 && <DropDownPicker
                items={[
                  {label: "Tanker/Oil Tankers", value: 0}, 
                  {label: "Sailing vessel/Barges/Tugs", value: 1}, 
                  {label: "Fishing Vessel/Service Boat", value: 2},
                  {label: "WOODEN ROWING BOAT W/WO AUXILIARY ENGINES", value: 3},
                  {label: "Bunker Barge", value: 4},
                  {label: "Vessel Calling for bunkering at Berth", value: 5},
                ]}
                containerStyle={{height: 43, width: "90%", marginBottom: 20}}
                itemStyle={{
                    justifyContent: 'center',
                }}
                labelStyle={{
                    fontSize: 16,
                    color: '#000'
                }}
                dropDownStyle={{backgroundColor: '#D7E2FE'}}
                placeholder= "Enter Sub Berth Hire Type"
                onChangeItem = {item => {
                  let obj = this.state.mangaloreInput;
                  obj['subBerthHireChoice'] = item.value;
                  this.setState({mangaloreInput :obj});
                }}
                />}
                {this.state.checkBtn3 && <SelectBox
                  label="Select the Pilotage"
                  options={[
                    {
                      item: 'Pilotage Both Inward/Outward',
                      id: 0,
                    },
                    {
                      item: 'SPM',
                      id: 1,
                    },
                    {
                      item: "Barges/Tugs/Launches",
                      id: 2
                    },
                    {
                      item: "Bunker Barge",
                      id: 3
                    },
                    {
                      item: "Exclusively Calling at Berth",
                      id: 4
                    },
                    {
                      item: "Exclusively Calling at Anchorage",
                      id: 5
                    }
                  ]}
                  selectedValues={this.state.mangaloreInput.hasOwnProperty('PilotageChoice') ? this.state.mangaloreInput.PilotageChoice : []}
                  onMultiSelect={(item)=>{
                    let obj = this.state.mangaloreInput;
                    obj['PilotageChoice'] = xorBy(obj.hasOwnProperty("PilotageChoice") ? obj.PilotageChoice : [], [item], 'id');
                    this.setState({mangaloreInput :obj});
                  }}
                  onTapClose={(item)=>{
                    let obj = this.state.mangaloreInput;
                    obj['PilotageChoice'] = xorBy(obj.hasOwnProperty("PilotageChoice") ? obj.PilotageChoice : [], [item], 'id');
                    this.setState({mangaloreInput :obj});
                  }}
                  isMulti
                />}

                {this.state.mangaloreInput.hasOwnProperty('PilotageChoice') &&  <>
                  {this.state.mangaloreInput.PilotageChoice.some(item => item.id == 2) && <TextInput
                    style={styles.input}
                    placeholder="Enter Barges Vessels no"
                    keyboardType="numeric"
                    onChangeText={ShiftingVsslNo => {
                      let obj = this.state.mangaloreInput;
                      let arr = this.state.mangaloreInput.hasOwnProperty('PilotageVsslNo') ? this.state.mangaloreInput.PilotageVsslNo : new Array(4).fill(0);
                      arr[0] = ShiftingVsslNo;
                      obj['PilotageVsslNo'] = arr;
                      this.setState({mangaloreInput :obj});
                    }}/>}

                  {this.state.mangaloreInput.PilotageChoice.some(item => item.id == 3) && <TextInput
                    style={styles.input}
                    placeholder="Enter Bunker Barge Vssl no"
                    keyboardType="numeric"
                    onChangeText={ShiftingVsslNo => {
                      let obj = this.state.mangaloreInput;
                      let arr = this.state.mangaloreInput.hasOwnProperty('PilotageVsslNo') ? this.state.mangaloreInput.PilotageVsslNo : new Array(4).fill(0);
                      arr[1] = ShiftingVsslNo;
                      obj['PilotageVsslNo'] = arr;
                      this.setState({mangaloreInput :obj});
                    }}/>}

                  {this.state.mangaloreInput.PilotageChoice.some(item => item.id == 4) && <TextInput
                    style={styles.input}
                    placeholder="Enter Exclusive Calling at Berth Vessels no"
                    keyboardType="numeric"
                    onChangeText={ShiftingVsslNo => {
                      let obj = this.state.mangaloreInput;
                      let arr = this.state.mangaloreInput.hasOwnProperty('PilotageVsslNo') ? this.state.mangaloreInput.PilotageVsslNo : new Array(4).fill(0);
                      arr[2] = ShiftingVsslNo;
                      obj['PilotageVsslNo'] = arr;
                      this.setState({mangaloreInput :obj});
                    }}/>}

                  {this.state.mangaloreInput.PilotageChoice.some(item => item.id == 5) && <TextInput
                    style={styles.input}
                    placeholder="Enter Exclusing Calling at Pilotage Vessels no"
                    keyboardType="numeric"
                    onChangeText={ShiftingVsslNo => {
                      let obj = this.state.mangaloreInput;
                      let arr = this.state.mangaloreInput.hasOwnProperty('PilotageVsslNo') ? this.state.mangaloreInput.PilotageVsslNo : new Array(4).fill(0);
                      arr[3] = ShiftingVsslNo;
                      obj['PilotageVsslNo'] = arr;
                      this.setState({mangaloreInput :obj});
                    }}/>}
                </>}

                {this.state.checkBtn4 && <SelectBox
                  label="Select the Shifting"
                  options={[
                    {
                      item: 'Pilotage Both Inward/Outward',
                      id: 0,
                    },
                    {
                      item: "Barges/Tugs/Launches",
                      id: 1
                    },
                    {
                      item: "Bunker Barge",
                      id: 2
                    },
                    {
                      item: "Exclusively Calling at Berth",
                      id: 3
                    },
                    {
                      item: "Exclusively Calling at Anchorage",
                      id: 4
                    }
                  ]}
                  selectedValues={this.state.mangaloreInput.hasOwnProperty('ShiftingChoice') ? this.state.mangaloreInput.PilotageChoice : []}
                  onMultiSelect={(item)=>{
                    let obj = this.state.mangaloreInput;
                    obj['ShiftingChoice'] = xorBy(obj.hasOwnProperty("ShiftingChoice") ? obj.PilotageChoice : [], [item], 'id');
                    this.setState({mangaloreInput :obj});
                  }}
                  onTapClose={(item)=>{
                    let obj = this.state.mangaloreInput;
                    obj['ShiftingChoice'] = xorBy(obj.hasOwnProperty("ShiftingChoice") ? obj.PilotageChoice : [], [item], 'id');
                    this.setState({mangaloreInput :obj});
                  }}
                  isMulti
                />}

                {this.state.mangaloreInput.hasOwnProperty('ShiftingChoice') && this.state.mangaloreInput.ShiftingChoice === 1 && <TextInput
                  style={styles.input}
                  placeholder="Enter Shifting Number of Vessels"
                  keyboardType="numeric"
                  onChangeText={ShiftingVsslNo => {
                    let obj = this.state.mangaloreInput;
                    obj['ShiftingVsslNo'] = ShiftingVsslNo;
                    this.setState({mangaloreInput :obj});
                  }}
                />}

                {this.state.checkBtn5 && <DropDownPicker
                items={this.state.calcType==="Foreign" ? [
                  {label: "103.22$", value: Math.round(103.22 * DollarVal)}, 
                  {label: "51.62$", value: Math.round(51.62 * DollarVal)},
                  {label: "43.01$", value: Math.round(43.01 * DollarVal)},
                ]:[
                  {label: "2759", value: 2759},
                  {label: "1379", value: 1379},
                  {label: "1149", value: 1149},
                ]}
                containerStyle={{height: 43, width: "90%", marginBottom: 20}}
                itemStyle={{
                    justifyContent: 'center',
                }}
                labelStyle={{
                    fontSize: 16,
                    color: '#000'
                }}
                dropDownStyle={{backgroundColor: '#D7E2FE'}}
                placeholder= "Choose Detention Charge"
                onChangeItem = {item => {
                  let obj = this.state.mangaloreInput;
                  obj['DetentionCharge'] = item.value;
                  this.setState({mangaloreInput :obj});
                }}
                />}

                {this.state.checkBtn6 && <DropDownPicker
                items={this.state.calcType==="Foreign" ? [
                  {label: "1280$ (SPM Operation)", value: Math.round(1280 * DollarVal)}, 
                  {label: "240$ (Other than SPM)", value: Math.round(240 * DollarVal)},
                  {label: "69$ (Pilot Launches)", value: Math.round(69 * DollarVal)},
                  {label: "57$ (Mooring Launches)", value: Math.round(57 * DollarVal)},
                  {label: "49$", value: Math.round(49 * DollarVal)},
                  {label: "98$", value: Math.round(98 * DollarVal)},
                  {label: "50$", value: Math.round(50 * DollarVal)},
                  {label: "8$", value: Math.round(8 * DollarVal)},
                  {label: "16$", value: Math.round(16 * DollarVal)}
                ]:[
                  {label: "48000 (SPM Operation)", value: 48000},
                  {label: "10000 (Other than SPM)", value: 10000},
                  {label: "2890 (Pilot Launches)", value: 2890},
                  {label: "2390 (Mooring Launches)", value: 2390},
                  {label: "2050", value: 2050},
                  {label: "4100", value: 4100},
                  {label: "2100", value: 2100},
                  {label: "335", value: 335},
                  {label: "671", value: 671}
                ]}
                containerStyle={{height: 43, width: "90%", marginBottom: 20}}
                itemStyle={{
                    justifyContent: 'center',
                }}
                labelStyle={{
                    fontSize: 16,
                    color: '#000'
                }}
                dropDownStyle={{backgroundColor: '#D7E2FE'}}
                placeholder= "Choose Tug Hire Charge"
                onChangeItem = {item => {
                  let obj = this.state.mangaloreInput;
                  obj['TugHireCharge'] = item.value;
                  this.setState({mangaloreInput :obj});
                }}
                />}

                {this.state.checkBtn7 && <DropDownPicker
                items={[
                  {label: "Liquid Cargo Vessel", value: 0}, 
                  {label: "Other Vessel", value: 1}
                ]}
                containerStyle={{height: 43, width: "90%", marginBottom: 20}}
                itemStyle={{
                    justifyContent: 'center',
                }}
                labelStyle={{
                    fontSize: 16,
                    color: '#000'
                }}
                dropDownStyle={{backgroundColor: '#D7E2FE'}}
                placeholder= "Enter Anchorage Type"
                onChangeItem = {item => {
                  let obj = this.state.mangaloreInput;
                  obj['AncChoice'] = item.value;
                  this.setState({mangaloreInput :obj});
                }}
                />}

                {this.state.mangaloreInput.hasOwnProperty('AncChoice') && <TextInput
                  style={styles.input}
                  placeholder="Input Anchorage Hours"
                  keyboardType="numeric"
                  onChangeText={AncHrs => {
                    let obj = this.state.mangaloreInput;
                    obj['AncHrs'] = AncHrs;
                    this.setState({mangaloreInput :obj});
                  }}
                />}

              </>}
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