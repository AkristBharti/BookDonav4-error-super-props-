import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import SwipeableFlatList from '../components/SwipeableFlatList';

export default class NotificationScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            userid : firebase.auth().currentUser.email,
            allNotification : [],

        }
        this.notificationRef = null
    }

    getNotifications = () => {
        this.notificationRef = db.collection('all_notifications').where('notifications_status', '==', 'Unread').where('targeted_user_id', '==', this.state.userid).onSnapshot((
            snapshot)=>{
                var allNotification = []
                snapshot.docs.map((doc)=>{
                    var notification = doc.data()
                    notification['doc_id']= doc.id
                    allNotification.push(notification)
                })
                this.setState({allNotification:allNotification})
            })
    }
    componentDidMount(){this.getNotifications()}
    componentWillUnmount(){this.notificationRef()} 


    keyExtractor = (item, index)=> index.toString()
    renderItem = ({item, index})=> {
        return(
            <ListItem key = {index}
            leftElement = {<Icon name = "book" type = "font-awesome" color = "#696969"/>}
            title = {item.book_name}
            subtitle = {item.message}
            bottomDivider
            />
        )    
    }


    render(){
        return(
            <View style = {{flex:1}}>
                <View style = {{flex:0.1}}>
                    <MyHeader title = {'Notifications'} navigations= {this.props.navigation}/>
                </View>
                <View style = {{flex:0.9}}>
                    {this.state.allNotification.length === 0 
                    ?(
                        <View style = {{flex:1, justifyContent : 'center', alignItems: 'center'}}>
                            <Text>You have no Notifications</Text>
                        </View>
                    )
                :(
                    <SwipeableFlatList allNotification = {this.state.allNotification}/>
                )
                }
                </View>
            </View>
        )
    }
}
