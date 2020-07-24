import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity , Animated, Dimensions, TouchableHighlight} from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import {SwipeListView} from 'react-native-swipe-list-view';

export default class SwipeableFlatList extends Component{

    constructor(props){
        super(props);
        this.state = {
            allNotifications : this.props.allNotifications,
        }
    }

    updateMarkAsRead = (notification) => {
        db.collection("all_notifications").doc(notification.doc_id).update({notification_status : Read})
    }

    onSwipeValueChange = (SwipeData) => {
        var allNotifications = this.state.allNotifications;
        const {key, value} = SwipeData;

        if(value < -Dimensions.get('window').width){
            const newData = [...allNotifications]
            const previousIndex = allNotifications.findIndex(item=>item.key===key)
            this.updateMarkAsRead(allNotifications[previousIndex])
            newData.splice(previousIndex, 1);
            this.setState({allNotifications : newData});
        }
    }

    renderItem = data =>(
  
            <ListItem 
            leftElement = {<Icon name = "Book" type = "font-awesome" color = '#696969'/>}
            title = {data.item.book_name}
            titleStyle = {{color : '#000000', fontWeight : 'Bold'}}
            subtitle = {data.item.message}
            bottomDivider
            />
   
    );

    renderHiddenItem = () =>(
        <View stlyle = {{alignItems: "center", flex : 1, flexDirection : 'row', justifyContent : 'space-between'}}>
            <View style = {[styles.backrightbutton, styles.backrightbuttonright]}>
                <Text style = {styles.backtextwhite}></Text>
            </View>
        </View>
    )




render(){
    return(
        <View style = {{flex : 1, backgroundColor : '#ffffff'}}>
            <SwipeListView
            disableRightSwipe
            data = {this.state.allNotifications}
            renderItem = {this.renderItem}
            renderHiddenItem = {this.renderHiddenItem}
            rightOpenValue = {-Dimensions.get('window').width}
            previewRowKey = {'0'}
            previewOpenDelay = {3000}
            previewOpenValue = {-40}
            onSwipeValueChange = {this.onSwipeValueChange}
            />
        </View>
    )
}
}


const styles = StyleSheet.create({

    backrightbutton : {
        alignItems : "center",
        justifyContent : 'center',
        position : 'absolute',
        width : 100,
        top : 0,
        bottom : 0,
    },

    backrightbuttonright : {
        backgroundColor : '#00FFFF',
        right : 0,
    },

    backtextwhite : {
        color : '#ffffff',
        fontSize : 15,
        fontWeight : 'bold'
    }
})