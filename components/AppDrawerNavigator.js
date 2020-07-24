import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SideBar from './SideBar';
import {AppTabNavigator} from './AppTabNavigator';
import UserSetting from '../screens/UserSetting';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home : {screen: AppTabNavigator},
    Settings : {screen: UserSetting},
    MyDonations : {screen:MyDonationScreen},
    Notifications : {screen:NotificationScreen}},
{contentComponent:SideBar},
{initialRouteName:'Home'}
)

