import React, { Component } from 'react';
import { View, Text, TextInput, Button, Alert, Dimensions } from 'react-native';
import MyButton from "./MyButton"
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
export default class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nazwa: "",
            tresc: "",
            pick: "",
            kategorie: [],
        };
        this.saveItem = this.saveItem.bind(this)
        this.changePick = this.changePick.bind(this)
        // this.ananas = this.ananas.bind(this)
        this.getKat = this.getKat.bind(this)
        this.dalej = this.dalej.bind(this)
    }
    componentDidMount(){
        this.funkcja = this.props.navigation.addListener('focus', () => {
            // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony
          this.getKat()
      });
        this.getKat()
        
    }
    componentWillUnmount() {
        this.funkcja();
    }
    async getKat(){
        let ananas = await SecureStore.getItemAsync("licznikKat");
        ananas = parseInt(ananas)
        let kategorie = []
        for(let i=0; i<ananas;i++){
            let klucz = "kluczKat" + i
            let a = await SecureStore.getItemAsync(klucz);
            a = JSON.parse(a)
            if(a != undefined){
                kategorie.push(a)
            }

        }
        this.setState({kategorie: kategorie})
        if(kategorie.length == 0){
            Alert.alert(
                "Brak Kategorii",
                "Najpierw dodaj kategorię",
                [
                  { text: "OK", onPress: this.dalej}
                ]
              );
        
          }
        
    }
    dalej(){
        this.props.navigation.navigate("dodaj kategorię")
    }
    async saveItem() {
        let nazwa = this.state.nazwa
        let tresc = this.state.tresc
        let kategoria = this.state.pick
        let ananas = await SecureStore.getItemAsync("licznik");
        if (ananas == undefined) {
            ananas = 0
        }
        else {
            ananas = parseInt(ananas)
        }

        let czas = new Date()
        let dzien = czas.getDate()
        let miesiac = czas.getMonth()
        let data = dzien + "." + miesiac

        let key = "klucz" + ananas
        let value = { klucz: key, nazwa: nazwa, tresc: tresc, data: data, color: (Math.floor(Math.random() * (3)) + 1), kategoria: kategoria }
        let value2 = JSON.stringify(value)
        await SecureStore.setItemAsync(key, value2);
        let banan = ananas + 1
        banan = JSON.stringify(banan)
        await SecureStore.setItemAsync("licznik", banan);
        this.textInput.clear()
        this.textInput2.clear()
        this.setState({nazwa: "", tresc: ""})
        this.props.navigation.navigate('notatki')

    }
    // async ananas(nazwa, tresc){
    //     this.saveItem(nazwa, tresc)
    // }
    changePick(value){
        this.setState({pick: value})
    }
    render() {
        let nazwa = this.state.nazwa
        let tresc = this.state.tresc
        let kat = this.state.kategorie
        let categories = kat.map((item) =>{
            return <Picker.Item label={item.kategoria} value={item.kategoria} />
        })
        // let test = kat.map(function(item){
        //     <Text>{item.kategoria}</Text>
        // })
        return (
            <View style={{flex: 1, backgroundColor: "#b094d1"}}>
                <TextInput
                    placeholderTextColor={"#838383"}
                    placeholder="Nazwa"
                    style={{width: ((Dimensions.get('window').width) - 100), alignSelf: 'center', backgroundColor: "#2f2f2f", color: "white", borderRadius: 20, height: ((Dimensions.get('window').height)/20), fontSize:20, padding:10, margin: 20}}
                    onChangeText={(text) => this.setState({ nazwa: text })}
                    ref={input => { this.textInput = input }} />
                <TextInput
                    placeholderTextColor={"#838383"}
                    placeholder="Treść"
                    style={{width: ((Dimensions.get('window').width) - 100), alignSelf: 'center', backgroundColor: "#2f2f2f", color: "white", borderRadius: 20, height: ((Dimensions.get('window').height)/20), fontSize:20, padding:10, margin: 20}}
                    ref={input2 => { this.textInput2 = input2 }}
                    onChangeText={(text) => this.setState({ tresc: text })} />
                <Picker

                    selectedValue={this.state.pick}
                    onValueChange={this.changePick}
                    dropdownIconColor={"white"}
                    style={{backgroundColor: "#2f2f2f", color: "white", margin: 10}}>

                    
                {categories}

                </Picker>

                <MyButton funcion={this.saveItem} nazwa={nazwa} tresc={tresc} text="dodaj" />
            </View>
        );
    }
}
