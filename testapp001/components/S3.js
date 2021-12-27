import React, { Component } from 'react';
import { View, Text, TextInput, Button, Dimensions } from 'react-native';
import MyButton from "./MyButton"
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
export default class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kategoria: "",
        };
        this.saveItem = this.saveItem.bind(this)
        // this.ananas = this.ananas.bind(this)
    }
    async saveItem() {
        let kategoria = this.state.kategoria
        let ananas = await SecureStore.getItemAsync("licznikKat");
        if (ananas == undefined) {
            ananas = 0
        }
        else {
            ananas = parseInt(ananas)
        }

        let key = "kluczKat" + ananas
        let value = { klucz: key, kategoria: kategoria }
        let value2 = JSON.stringify(value)
        await SecureStore.setItemAsync(key, value2);
        let banan = ananas + 1
        banan = JSON.stringify(banan)
        await SecureStore.setItemAsync("licznikKat", banan);
        this.textInput.clear()
        this.props.navigation.navigate('notatki')

    }
    // async ananas(nazwa, tresc){
    //     this.saveItem(nazwa, tresc)
    // }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#b094d1"}}>
                <TextInput
                    placeholderTextColor={"#838383"}
                    style={{ width: ((Dimensions.get('window').width) - 100), alignSelf: 'center', backgroundColor: "#2f2f2f", color: "white", borderRadius: 20, height: ((Dimensions.get('window').height) / 20), fontSize: 20, padding: 10, margin: 20 }}
                    placeholder="Kategoria"
                    onChangeText={(text) => this.setState({ kategoria: text })}
                    ref={input => { this.textInput = input }} />
                <MyButton funcion={this.saveItem} text="dodaj" />
            </View>
        );
    }
}
