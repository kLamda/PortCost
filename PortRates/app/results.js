import React, { useState, useEffect, Component } from "react";
import { View,ScrollView, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import { Card, Divider } from "react-native-elements";
import { Table, Row, Rows, TableWrapper, Cell} from 'react-native-table-component';



export default class EndPage extends Component 
{  
   constructor(props) {
      super(props);
      this.state = {
         tableHead: ['Type', 'Discount', 'Cost'],
         portDiscount: 0,
         BerthDiscount: 0,
         WtrChrgDiscount: 0,
         PilotageDiscount: 0,
         vesselDiscount: 0,
         tableData: this.generateDataTable(0),
         finalCost: this.generateDataTable(1),
         discTable: [],
         checkBtn1: false,
         checkBtn2: false,
         checkBtn3: false,
         checkBtn4: false,
         portType: this.checkPort(),
         discIndex: this.checkPort()=="Paradeep" ? 4 : 1
    };
   }

   clickBtn = (btn) => {
        if(btn === 0) {
          this.setState({checkBtn1: !this.state.checkBtn1})
        } else if(btn === 1) {
          this.setState({checkBtn2: !this.state.checkBtn2})
        } else if(btn === 2) {
          this.setState({checkBtn3: !this.state.checkBtn3})
        } else if(btn === 3) {
          this.setState({checkBtn4: !this.state.checkBtn4})
        }
      }

   checkBtnClick = () => {
      var arr = [this.state.checkBtn1, this.state.checkBtn2, this.state.checkBtn3, this.state.checkBtn4];
      return arr.some(item => item == true) ? true : false;
   }

   checkPort = () => (this.props.route.params.value.hasOwnProperty("isParadeep") ? "Paradeep" : "Gopalapur")

   generateDataTable =(choice) => {
      var data = this.props.route.params.value;
      var dataObj = data.calcVal;
      if(choice === 0) {
         var dataTable = []
         for(let i=0; i<Object.keys(dataObj).length; i++){
            dataTable.push([Object.keys(dataObj)[i], "", dataObj[Object.keys(dataObj)[i]]]);
         }
         return dataTable;
      } 
   }

   render() {
      var data = this.props.route.params.value;
      let TotalDiscount = 0;
      var dataObj = data.calcVal;
      let portDiscount = 0;
      let BerthDiscount = 0;
      let WaterChargeDiscount = 0;
      let PilotageDiscount = 0;
      let vesselDiscount = 0;
      if(this.state.portType == "Paradeep"){
         portDiscount = this.state.portDiscount * 0.01 * dataObj["Port Dues"];
         BerthDiscount = this.state.BerthDiscount * 0.01 * dataObj["Berth Hire"];
         WaterChargeDiscount = this.state.WtrChrgDiscount * 0.01 * dataObj["Water Charge"];
         PilotageDiscount = this.state.PilotageDiscount * 0.01 * dataObj["Pilotage"];
         TotalDiscount = portDiscount + BerthDiscount + WaterChargeDiscount + PilotageDiscount;
      }
      else{
         vesselDiscount= this.state.vesselDiscount * 0.01 * dataObj["Vessel Charge"];
         TotalDiscount = vesselDiscount;
      }
      const styles = StyleSheet.create({
         container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#eee' },
         head: { height: 40, borderBottomColor: '#AAA', borderBottomWidth: 2 },
         text: { margin: 6 },
         row: { flexDirection: 'row' },
         btn: { width: 58, height: 18,  borderRadius: 10, },
         btnText: { textAlign: 'center', color: '#000', width: '100%' },
         card: {
            width: '100%',
            marginHorizontal: 'auto',
         },
         final: {
            borderTopColor: '#AAA',
            borderTopWidth: 2,
         },
         inputText: {
            width: "100%",
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
         btnText_: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: '#333',
         },
         BtnContainer: {
            width: "100%",
            alignItems: 'center',
         }
      });
      const state = this.state;
   
      const element = (data, index) => (
         <TouchableOpacity onPress={() => this.clickBtn(index)}>
            {data == 0 ?
            <View style={[styles.btn, {backgroundColor: this.state.checkBtn1 ? '#ff6600' : '#66ff99'}]}>
               {this.state.checkBtn1 ?
               <Text style={styles.btnText}>-</Text>
               : <Text style={styles.btnText}>+</Text> }
            </View> : null}
            {data == 1 ?
            <View style={[styles.btn, {backgroundColor: this.state.checkBtn2 ? '#ff6600' : '#66ff99'}]}>
               {this.state.checkBtn2 ?
               <Text style={styles.btnText}>-</Text>
               : <Text style={styles.btnText}>+</Text> }
            </View> : null}
            {data == 2 ?
            <View style={[styles.btn, {backgroundColor: this.state.checkBtn3 ? '#ff6600' : '#66ff99'}]}>
               {this.state.checkBtn3 ?
               <Text style={styles.btnText}>-</Text>
               : <Text style={styles.btnText}>+</Text> }
            </View> : null}
            {data == 3 ?
            <View style={[styles.btn, {backgroundColor: this.state.checkBtn4 ? '#ff6600' : '#66ff99'}]}>
               {this.state.checkBtn4 ?
               <Text style={styles.btnText}>-</Text>
               : <Text style={styles.btnText}>+</Text> }
            </View> : null}
         </TouchableOpacity>
      );
   
      return(
            <ScrollView style={styles.container}>
               <Card title="Results" borderRadius={10} containerStyle={styles.card}>
                  <Table borderStyle={{borderColor: 'transparent'}}>
                     <Row data={state.tableHead}  style={styles.head} textStyle={styles.text}/>
                     {
                        state.tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                           {
                              rowData.map((cellData, cellIndex) => (
                              <Cell key={cellIndex} data={cellIndex === 1 && index<this.state.discIndex ? element(index, index) : cellData} textStyle={styles.text}/>
                              ))
                           }
                        </TableWrapper>
                        ))
                     }
                  </Table>
                  {this.state.portType == "Paradeep" && this.checkBtnClick() ?
                  <Table style={{borderTopColor: "#AAA", borderWidth: 2}} borderStyle={{borderColor: 'transparent'}}>
                     {this.state ?
                     <TableWrapper style={styles.row}>
                           {
                              ["Port Dues Discount", "", portDiscount].map((cellData, cellIndex) => (
                              <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                              ))
                           }
                     </TableWrapper>:<TableWrapper></TableWrapper>}
                     {this.state.checkBtn2 ?
                     <TableWrapper style={styles.row}>
                           {
                              ["Berth Hire Discount", "", BerthDiscount].map((cellData, cellIndex) => (
                              <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                              ))
                           }
                     </TableWrapper>:<TableWrapper></TableWrapper>}
                     {this.state.checkBtn3 ?
                     <TableWrapper style={styles.row}>
                           {
                              ["Water Charge Discount", "", WaterChargeDiscount].map((cellData, cellIndex) => (
                              <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                              ))
                           }
                     </TableWrapper>:<TableWrapper></TableWrapper>}
                     {this.state.checkBtn4 ?
                     <TableWrapper style={styles.row}>
                           {
                              ["Pilotage Discount", "", PilotageDiscount].map((cellData, cellIndex) => (
                              <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                              ))
                           }
                     </TableWrapper>:<TableWrapper></TableWrapper>} 
                  </Table>:null}
                  {this.checkBtnClick() && this.state.portType=="Gopalapur"?
                  <Table style={{borderTopColor: "#AAA", borderWidth: 2}} borderStyle={{borderColor: 'transparent'}}>
                     {this.state.checkBtn1 && this.state.portType=="Gopalapur"?
                     <TableWrapper style={styles.row}>
                           {
                              ["Vessel Discount", "", vesselDiscount].map((cellData, cellIndex) => (
                              <Cell key={cellIndex} data={cellData} textStyle={styles.text}/>
                              ))
                           }
                     </TableWrapper>:<TableWrapper></TableWrapper>} 
                  </Table>:null}
                  <Table borderStyle={{borderColor: "transparent"}}>
                     {this.checkBtnClick() ? 
                     <Row data={["Total Discount" , "", TotalDiscount]}  textStyle={styles.text}/>
                     :<Row />}
                     <Row data={["Final Cost" , "", data.finalCost['Final Cost'] - TotalDiscount]}  style={styles.final} textStyle={styles.text}/>
                  </Table>
               </Card>
               {this.checkBtnClick() && this.state.portType=="Paradeep" ?
               <Card title="Discounts" borderRadius={10} containerStyle={styles.card}>
                  {this.state.checkBtn1 ?
                  <View style={styles.inputText}>
                     <TextInput
                        style={styles.input}
                        placeholder="Input Port Dues Discount"
                        keyboardType="numeric"
                        onChangeText={portDiscount => this.setState({portDiscount})}
                     />
                  </View>:null}
                  {this.state.checkBtn2 ?
                  <View style={styles.inputText}>
                     <TextInput
                        style={styles.input}
                        placeholder="Input Bert Hire Discount"
                        keyboardType="numeric"
                        onChangeText={BerthDiscount => this.setState({BerthDiscount})}
                     />
                  </View>:null}
                  {this.state.checkBtn3 ?
                  <View style={styles.inputText}>
                     <TextInput
                        style={styles.input}
                        placeholder="Input Water Charge Discount"
                        keyboardType="numeric"
                        onChangeText={WtrChrgDiscount => this.setState({WtrChrgDiscount})}
                     />
                  </View>:null}
                  {this.state.checkBtn4 ?
                  <View style={styles.inputText}>
                     <TextInput
                        style={styles.input}
                        placeholder="Input Pilotgae Discount"
                        keyboardType="numeric"
                        onChangeText={PilotageDiscount => this.setState({PilotageDiscount})}
                     />
                  </View>:null}
               </Card> : null}
               {this.checkBtnClick() && this.state.portType == "Gopalapur" ?
               <Card title="Discounts" borderRadius={10} containerStyle={styles.card}>
                  {this.state.checkBtn1 ?
                  <View style={styles.inputText}>
                     <TextInput
                        style={styles.input}
                        placeholder="Input Vessel Discount"
                        keyboardType="numeric"
                        onChangeText={vesselDiscount => this.setState({vesselDiscount})}
                     />
                  </View>:null}
               </Card>:null}
            </ScrollView>
            // <View style={styles.container}>
            
            // </View>
      );
   }
}
