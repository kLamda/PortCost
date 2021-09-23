import React, { useState, useEffect, Component } from "react";
import { View,ScrollView, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Card, Divider } from "react-native-elements";
import { Table, Row, Rows, TableWrapper, Cell} from 'react-native-table-component';



export default class EndPage extends Component 
{  
   constructor(props) {
      super(props);
      this.state = {
         tableHead: ['Type', 'Discount', 'Cost'],
         tableData: this.generateDataTable(),
         checkBtn1: false,
         checkBtn2: false,
         checkBtn3: false,
         checkBtn4: false,
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


   generateDataTable =() => {
      var dataObj = this.props.route.params.value;
      var dataTable = []
      for(let i=0; i<Object.keys(dataObj).length; i++){
         dataTable.push([Object.keys(dataObj)[i], "", dataObj[Object.keys(dataObj)[i]]]);
      }
      return dataTable;
   }

   render() {
      const styles = StyleSheet.create({
         container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#eee' },
         head: { height: 40, borderBottomColor: '#AAA', borderBottomWidth: 3 },
         text: { margin: 6 },
         row: { flexDirection: 'row' },
         btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 10, },
         btnText: { textAlign: 'center', color: '#fff', width: '100%' },
         card: {
            width: '100%',
            marginHorizontal: 'auto',
         },
      });
      const state = this.state;
   
      const element = (data, index) => (
         <TouchableOpacity onPress={() => this.clickBtn(index)}>
         <View style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
         </View>
         </TouchableOpacity>
      );
   
      return(
            <ScrollView style={styles.container}>
               <Card title="Results" borderRadius={10} containerStyle={styles.card}>
                  {/* <Table >
                     <Row data={data.HeadTable} flexArr={[2,1]} style={styles.HeadStyle} textStyle={styles.TableText}/>
                     <Divider />
                     <Rows data={data.DataTable} flexArr={[2,1]} textStyle={styles.TableText}/>
                  </Table> */}
                  <Table borderStyle={{borderColor: 'transparent'}}>
                     <Row data={state.tableHead}  style={styles.head} textStyle={styles.text}/>
                     {
                        state.tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                           {
                              rowData.map((cellData, cellIndex) => (
                              <Cell key={cellIndex} data={cellIndex === 1 && index<4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                              ))
                           }
                        </TableWrapper>
                        ))
                     }
                  </Table>
               </Card>
            </ScrollView>
            // <View style={styles.container}>
            
            // </View>
      );
   }
}
