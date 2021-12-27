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
            item: null,
        };
        this.saveItem = this.saveItem.bind(this)
        this.changePick = this.changePick.bind(this)
        // this.ananas = this.ananas.bind(this)
        this.getKat = this.getKat.bind(this)
        this.dalej = this.dalej.bind(this)
        this.getItem = this.getItem.bind(this)
    }
    componentDidMount(){
        this.funkcja = this.props.navigation.addListener('focus', () => {
            // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony
          this.getKat()
          this.getItem()
      });
        this.getKat()
        this.getItem()
        
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
    async getItem(){
        // this.setState({nazwa: this.props.route.params.nazwa, tresc: this.props.route.params.tresc, pick: this.props.route.params.kategoria})
        let a = await SecureStore.getItemAsync(this.props.route.params.klucz)
        a = JSON.parse(a)
        this.setState({nazwa: a.nazwa, tresc: a.tresc, pick: a.kategoria, item: a})
        console.log(this.state.item)

    }
    dalej(){
        this.props.navigation.navigate("dodaj kategorię")
    }
    async saveItem() {
        let item = this.state.item
        let nazwa = this.state.nazwa
        let tresc = this.state.tresc
        let kategoria = this.state.pick
        let key = item.klucz
        let value = { klucz: key, nazwa: nazwa, tresc: tresc, data: item.data, color: item.color, kategoria: kategoria }
        let value2 = JSON.stringify(value)
        await SecureStore.setItemAsync(key, value2);
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
                    style={{width: ((Dimensions.get('window').width) - 100), alignSelf: 'center', backgroundColor: "#2f2f2f", color: "white", borderRadius: 20, height: ((Dimensions.get('window').height)/20), fontSize:20, padding:10, margin:20}}
                    defaultValue={this.props.route.params.nazwa}
                    onChangeText={(text) => this.setState({ nazwa: text })}
                    ref={input4 => { this.textInput4 = input4 }} />
                <TextInput
                    style={{width: ((Dimensions.get('window').width) - 100), alignSelf: 'center', backgroundColor: "#2f2f2f", color: "white", borderRadius: 20, height: ((Dimensions.get('window').height)/20), fontSize:20, padding:10}}
                    defaultValue={this.props.route.params.tresc}
                    ref={input5 => { this.textInput5 = input5 }}
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

