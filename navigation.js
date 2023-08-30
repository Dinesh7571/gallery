import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import SrchScreen from './screens/SrchScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>

      <Drawer.Navigator initialRouteName="Home">

        <Drawer.Screen name="Home" component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.navigate('SearchScreen')}>
                <FontAwesome name="search" size={24} color="black" />
              </TouchableOpacity>
                ),

          })} />

        <Stack.Screen name="SearchScreen" component={SrchScreen} options={{ headerShown: false }} />
      </Drawer.Navigator>


    </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})