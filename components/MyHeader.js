import * as React from 'react';
import {Header, Icon, Badge} from 'react-native-elements';
import { View } from 'react-native';
import db from '../config'


export default class MyHeader extends React.Components {

    constructor(props){
        super(props)
        this.state = {
            value : "",
        }
    }
    getNumberUnreadNotification(){
        db.collection('all_notifications').where('notification_status', '==', 'Unread').onSnapshot((snapshot)=>{
            var unreadNoti = snapshot.docs.map((doc)=>doc.data())
            this.setState({value : unreadNoti.length})
        })
    }

    componentDidMount(){
        this.getNumberUnreadNotification();
    }

    bellIconwithbadge = () =>{
        return(
            <View>
                <Icon  name = 'bell' type = 'font-awesome' color = '#696969' size = {20}
                onPress = {()=>this.props.navigation.navigate('Notification')}/>
                <Badge value = {this.state.value} containerStyle = {{position: 'absolute', top : -4, right: -4}} />
            </View>
        )
    }
    render(){
        return(
            <Header
                leftComponent = {<Icon name = 'bars' type = 'font-awesome' color = '#696969'
                    onPress = {()=>props.navigation.toggleDrawer()}
                />}

                centerComponent = {{text : props.title, style:{color : '#90a5a9', fontWeight : "bold"}}}
                rightComponent =  {<this.bellIconwithbadge{...this.props}/>}
                backgroundColor = "#eaf8fe"
            />
        )
    }
}
