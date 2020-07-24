import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text, FlatList,TouchableOpacity, Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class UserSetting extends Component{

    constructor(){
        super();
        this.state={
          emailId:'',
          firstName:'',
          lastName:'',
          address:'',
          contact:'',
          docId:'',
        }
    }

    componentDidMount(){
      this.getUserDetails();
    }

    getUserDetails = ()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id', '==', email).get().then(snapshot=>snapshot.forEach(doc => {
          var data = doc.data();
          this.setState({emailId : data.email_id,
            firstName: data.first_name,
            lastName : data.last_name,
            contact : data.contact,
            address: data.address,
            docId : doc.id
          })
        }))
    }


    updateUserDetails = ()=>{
        db.collection('users').doc(this.state.docId).update({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            contact:this.state.contact,
            address:this.state.address
          })
          return  Alert.alert('User Details Changed!')
    }
    render(){
        return(
            <View style = {{flex:1}}>
                <MyHeader title = "User Settings" navigation = {this.props.navigation}/>
                <View style={{flex:1, alignItems:"center"}}>
                <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
          value = {this.state.firstName}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
          value = {this.state.lastName}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
          value = {this.state.contact}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
          value = {this.state.address}
        />
        <TouchableOpacity onPress = {()=>{this.updateUserDetails()}}>
            <Text>Save</Text>
        </TouchableOpacity>
            </View>
        </View>

            
        )
    }
}
const styles = StyleSheet.create({
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  }})