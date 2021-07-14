import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View, ImageBackground, Button} from 'react-native';
import {enableScreens} from 'react-native-screens'
enableScreens();
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import SignInScreen from '/Users/rjoneal/Desktop/LSAMP Research/firstPrototype/assets/Screens/SignInScreen.js';
import Profile from '/Users/rjoneal/Desktop/LSAMP Research/firstPrototype/assets/Screens/Profile.js';
import MyTabs from './assets/Screens/WelcomeScreen';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

// creates a stack of profile screens
const Stack = createNativeStackNavigator()
// this loads all of the components 
export default function App() 
{
    console.log("App executed!")
    return(
      <ApplicationProvider {...eva} theme = {eva.dark}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = "SignIn">
          <Stack.Screen name = "SignIn" component = {SignInScreen} />
          <Stack.Screen name = "MyProfile" component = {Profile} />
          <Stack.Screen name = "WelcomeScreen" component ={MyTabs} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ApplicationProvider>
    );
  }

  
const styles = StyleSheet.create(
  {
  container:
   {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:
  {
    width: 300,
    height: 400,
  },
});