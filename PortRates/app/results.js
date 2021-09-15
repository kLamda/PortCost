import React, { useState, useEffect } from "react";
import { View,ScrollView, Text, StyleSheet } from "react-native";

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default function EndPage({route}) 
{  
   var dataObj = route.params.value;
   var dataTable = []
   for(let i=0; i<Object.keys(dataObj).length; i++){
      dataTable.push([Object.keys(dataObj)[i], dataObj[Object.keys(dataObj)[i]]]);
   }
   console.log(dataTable);

   var data = {
      HeadTable: ['Attribute', 'value'],
      DataTable: dataTable
    };
   return(
         <ScrollView style={styles.container}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
               <Row data={data.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
               <Rows data={data.DataTable} textStyle={styles.TableText}/>
            </Table>
         </ScrollView>
     );
}
const styles = StyleSheet.create({
   container: { 
      flexGrow: 1,
      padding: 18,
      paddingTop: 35,
      backgroundColor: '#ffffff' 
   },
   HeadStyle: { 
      height: 50,
      alignContent: "center",
      backgroundColor: '#ffe0f0'
   },
   TableText: { 
      margin: 10
   }
});