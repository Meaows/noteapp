import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, Dimensions } from 'react-native';
import Item from "./Item"
import * as SecureStore from 'expo-secure-store';
export default class S1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notatki: [],
            filtered: []
        };
        this.getItems = this.getItems.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.edycja = this.edycja.bind(this)
        this.wyszukiwanie = this.wyszukiwanie.bind(this)
    }
    componentDidMount(){
        this.funkcja = this.props.navigation.addListener('focus', () => {
            // ta funkcja wykona się za kazdym razem kiedy ekran zostanie przywrócony
          this.getItems()
      });
        this.getItems()
        
    }
    componentWillUnmount() {
        this.funkcja();
    }
    async getItems() {
        
        let ananas = await SecureStore.getItemAsync("licznik");
        ananas = parseInt(ananas)
        let notatki = []
        for(let i=0; i<ananas;i++){
            let klucz = "klucz" + i
            let a = await SecureStore.getItemAsync(klucz);
            a = JSON.parse(a)
            if(a != undefined){
                notatki.push(a)
            }

        }
        this.setState({notatki: notatki, filtered: notatki})
        console.log(this.state.notatki)

    }
    edycja(klucz, nazwa, tresc, kategoria){
        this.setState({filtered: this.state.notatki})
        this.textInput3.clear()
        this.props.navigation.navigate("edycja", {klucz: klucz, nazwa: nazwa, tresc: tresc, kategoria: kategoria})
    }
    async deleteItem(key) {
        await SecureStore.deleteItemAsync(key);
    }
    wyszukiwanie(text){
        function filtrowanko(value) {
            if(value.kategoria.toLowerCase().includes(text.toLowerCase())){
                return value
            }
            else if(value.nazwa.toLowerCase().includes(text.toLowerCase())){
                return value
            }
            else if(value.tresc.toLowerCase().includes(text.toLowerCase())){
                return value
            }
            else if(value.kategoria.toLowerCase().includes(text.toLowerCase())){
                return value
            }
            else if(value.nazwa.toLowerCase().includes(text.toLowerCase())){
                return value
            }
            else if(value.tresc.toLowerCase().includes(text.toLowerCase())){
                return value
            }
          }
        let notatki = this.state.notatki
        // let ananas = notatki.map((a) => { return a.toLowerCase() })
        let filtered = notatki.filter(filtrowanko)
        this.setState({filtered: filtered})
        
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#b094d1"}}>
                    <TextInput
                    placeholderTextColor={"#838383"}
                    placeholder='Szukaj notatki'
                    ref={input3 => { this.textInput3 = input3 }}
                    onChangeText={text => this.wyszukiwanie(text)}
                    style={{width: ((Dimensions.get('window').width) - 100), alignSelf: 'center',  backgroundColor: "#2f2f2f", color: "white", borderRadius: 20, height: ((Dimensions.get('window').height)/20), fontSize:20, padding:10, margin: 20}}/>
                <FlatList
                    numColumns={2}
                    data={this.state.filtered}
                    key={2}
                    renderItem={({ item }) => <Item edycja={this.edycja} getItems={this.getItems} delete={this.deleteItem} color={item.color} data={item.data} nazwa={item.nazwa} tresc={item.tresc} klucz={item.klucz} kategoria={item.kategoria}>  </Item>}
                />
            </View>
        );
    }
}
