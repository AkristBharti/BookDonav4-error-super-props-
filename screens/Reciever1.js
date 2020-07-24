import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, FlatList,TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class RecieverDetailScreen extends Component{

    render(){
        return(
            <View style = {{flex:1}}>
                <Text>Reciever Screen</Text>
            </View>
        )
    }


}