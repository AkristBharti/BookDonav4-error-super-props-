import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import RecieverDetailScreen from '../screens/RecieverDetailScreen';
import DonateBookScreen from '../screens/DonateBookScreen';

export const AppStackNavigator = createStackNavigator({
    BookDonate : {screen: DonateBookScreen},
    RecieverDetail : {screen : RecieverDetailScreen},
},
    {initialRouteName : 'BookDonate'}
)