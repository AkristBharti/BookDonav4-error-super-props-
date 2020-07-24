import React from 'react';
import {View, Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import firebase from 'firebase';



export default class SideBar extends React.Component{
    render(){
        return(
            <View style = {{flex : 1}}>
                <View style = {styles.drawerItemConatiner}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style = {styles.logoutBtn}>
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut();
                    }}>
                        <Text>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    drawerItemConatiner:{
        flex:0.8,
    },
    logoutBtn:{
        width:100,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})