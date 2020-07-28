import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class MyDonationScreen extends Component{

    constructor(){
        super()
        this.state = {
          donorId  : firebase.auth().currentUser.email,
          allDonations : [],
          donorName : ''
        }
      this.requestRef= null
      }

      //to get the donor details from database
    getDonorDetails = (donorId)=>{
        db.collection('users').where("email_id", "==", donorId).get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    donorName : doc.data().first_name + ' ' + doc.data().last_name,

                })
            })
        })
    }

    

    getAllDonation = () => {
        this.requestRef = db.collection('all_donations').where("donor_id", "==", this.state.donorId).onSnapshot((snapshot)=>{
            var allDonations = []
            snapshot.docs.map((doc)=>{
                var donation = doc.data()
                donation["doc_id"] = doc.id
                allDonations.push(donation)
           })
           this.setState({allDonations: allDonations})
        })  
            
    }


    sendBook = (bookDetails)=>{
        if (bookDetails.request_status === "Book Sent"){
            var requestStatus = "Donor Interested";
            db.collection('all_donations').doc(bookDetails.doc_id).update({request_status : 'Donor Interested'})
            this.sendNotification(bookDetails, requestStatus)
        }
        else{
            var requestStatus = "Book Sent";
            db.collection('all_donations').doc(bookDetails.doc_id).update({request_status : 'Book Sent'})
            this.sendNotification(bookDetails, requestStatus)
        }
    }
    
    sendNotification = (bookDetails, requestStatus) =>{
        var requestId  = bookDetails.request_id;
        var donorid = bookDetails.donor_id;
        db.collection('all_notifications').where('request_id', '==' , requestId).where('donor_id', '==', donorid).get().then((
            snapshot)=>{
                snapshot.forEach((doc)=>{
                    var message = "";
                    if(requestStatus === "Book Sent"){
                        message = this.state.donorName + ' has sent you the book!'
                    }
                    else{
                        message = this.state.donorName + ' has shown interst to donate the book!'
                    }
                    db.collection('all_notifications').doc(doc.id).update({
                        message : message,
                        notification_status : "Unread",
                        date : firebase.firestore.FieldValue.serverTimestamp()
                    })
                })
            })
    }

    keyExtractor = (item, index) => index.toString();
    renderItem = ({item, i})=>(
        <ListItem key = {i}
        title = {item.book_name}
        subtitle = {"Requested by: " + item.requested_by + "\n Status : " + item.request_status}
        leftElement = {<Icon name = "book" type = 'font-awesome' color = '#696969'/>}
        titleStyle = {{color : 'black', fontWeight : 'bold'}}
        rightElement = {
        <TouchableOpacity style = {[styles.button,{backgroundColor : item.request_status === 'Book Sent' ? "Green" : "Orange"}]}
        onPress = {()=>{this.sendBook(item)}}
        >
            <Text>{item.request_status === 'Book Sent' ? 'Book Sent' : 'Send Book'}</Text>
        </TouchableOpacity>
        }
        bottomDivider
        />
    )
    componentDidMount(){
        this.getDonorDetails(this.state.donorId)
        this.getAllDonation()
    
    }
    render(){
        return(
            <View style = {{flex : 1}}>
                <MyHeader navigation = {this.props.navigation} title = "My Donations"/>
                <View style = {{flex:1}}>
                    {this.state.allDonations.length === 0
                    ?(<View>
                        <Text>No Books Donated</Text>
                        </View>)
                    :(
                        <FlatList
                        keyExtractor = {this.keyExtractor}
                        data = {this.state.allDonations}
                        renderItem = {this.renderItem}

                        
                        
                        />
                    )   
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button : {
        width : 100,
        height : 30,
        justifyContent : "center",
        alignItems: "center"
    }
})