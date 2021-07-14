import React from 'react';
import { ImageBackground, StyleSheet, View, Image, TouchableOpacity, TextInput, SafeAreaView, Button, onChangeText, onChangeNumber, ColorPropType } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Navigator, Screen, TabBar, Tab, Layout, Text } from '@ui-kitten/components';
import MyDataScreen from './MyData';
import editMyProfile from './AboutUs';
import CreateNote from './CreateLog';
import AllNotes from './Logs';
import Note from './Log';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const newStack = createNativeStackNavigator()

const logNavigator = () => (
  <newStack.Navigator initialRouteName="AllNotes">
    <newStack.Screen name="Create" component={CreateNote}/>
    <newStack.Screen name="AllNotes" component={AllNotes} options={{ headerShown: false }}/>
    <newStack.Screen name="Note" component={Note} options={{ headerShown: false }} />
  </newStack.Navigator>
)
const myTab = createMaterialBottomTabNavigator();
function MyTabs() {
  return (
    <myTab.Navigator
      initialRouteName="WelcomeScreen"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}
    >
      <myTab.Screen
        name="My Profile"
        component={editMyProfile}
        options={{
          tabBarLabel: 'My Profile',
          tabBarColor: "#e6bbad",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={"black"} size={20} />
          ),
        }}
      />
      <myTab.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          tabBarLabel: 'Welcome',
          tabBarColor: "#ade6d8",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={"black"} size={20} />
          ),
        }}
      />
      <myTab.Screen
        name="MyData"
        component={MyDataScreen}
        options={{
          tabBarLabel: 'MyData',
          tabBarColor: "#add8e6",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="google-analytics" color={"black"} size={20} />
          ),
          tabBarBadge: 3,
        }}
      />
      <myTab.Screen
        name="Logs"
        component={logNavigator}
        options={{
          tabBarLabel: 'Logs',
          tabBarColor: "#adbce6",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="grease-pencil" color={"black"} size={20} />
          ),
        }}
      />
    </myTab.Navigator>
  );
}
function WelcomeScreen() {
  return (
      <View style = {{flex:1,backgroundColor: "#e8f4f8"}}>
            <Text style = {styles.title} category = "h1" >(Eplipsey App Name)</Text>
      </View>

  );
}

const styles = StyleSheet.create({
  title:  {
      textAlign: "center",
      marginTop: 50, 
      backgroundColor: "#add8e6",
      fontSize: 40,
      color: "#FFFFFF"

  },
  background:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  loginScreenButton:
  {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#add8e6',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },

  buttonContainer:
  {
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'center',

  },
});
export default MyTabs;