import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.delete = this.delete.bind(this)
    this.dalej = this.dalej.bind(this)
    this.edycja = this.edycja.bind(this)
  }
  delete(){
    Alert.alert(
        "Delete",
        "Do you really want to delete?",
        [
          {
            text: "Cancel",
          },
          { text: "OK", onPress: this.dalej}
        ]
      );

  }
  dalej(){
    console.log(this.props.klucz)
    this.props.delete(this.props.klucz)
    this.props.getItems()
  }
  edycja(){
    this.props.edycja(this.props.klucz, this.props.nazwa, this.props.tresc, this.props.kategoria)
  }
  render() {
      let color
      if(this.props.color == 1){
        color = "#7e23ea"
      }
      else if(this.props.color == 2){
          color = "#f83cc3"
      }
      else if(this.props.color == 3){
        color = "#DEB887"
    }
    else if(this.props.color == 4){
        color = "#6495ED"
    }
    else{
        color = "#6495ED"
    }
    return (
      <TouchableOpacity onPress={this.edycja} onLongPress={this.delete} style={{backgroundColor: color,         height: ((Dimensions.get('window').width / 2) - 10),
      width: ((Dimensions.get('window').width / 2) - 10),
      borderRadius: 10,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
      marginTop: 10,}}>
        <View style={{width: 100, height: 30, justifyContent: 'center', alignItems: 'center',  backgroundColor: "#2f2f2f", borderRadius: 30, margin: 10, }}>
        <Text style={{color: color, fontSize: 17}}>{this.props.kategoria}</Text>
        </View>
        <Text style={{alignSelf: 'flex-end', color: "white", fontSize: 17}}> {this.props.data} </Text>
        <Text style={{margin: 10, color: "white", fontSize: 20}}> {this.props.nazwa} </Text>
        <Text style={{margin: 10, color: "white", fontSize: 17}}> {this.props.tresc} </Text>
      </TouchableOpacity>
    );
  }
}

