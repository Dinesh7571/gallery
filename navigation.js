import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Navigation = () => {
   // const Stack = createNativeStackNavigator();

    const Drawer = createDrawerNavigator();
  return (
<NavigationContainer>
 <Drawer.Navigator initialRouteName="Home">

        <Drawer.Screen name="Home" component={HomeScreen} />
        
 </Drawer.Navigator>
</NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})