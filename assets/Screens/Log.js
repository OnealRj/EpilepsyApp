import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../Firebase/fire.js';
import {useFocusEffect, useNavigation } from '@react-navigation/core';
import React,{useState} from 'react';
import {Text,Button} from '@ui-kitten/components';
import { ImageBackground, StyleSheet, 
    View} from 'react-native';

export default function Note({route})
{
    const[notes, setNotes] = useState([])
    const {singleNote} = route.params
    const navigation = useNavigation()
    useFocusEffect(
        React.useCallback(() => 
        {
            getNotes()
        }, [])
    )
    const getNotes = () => 
    {
        AsyncStorage.getItem("NOTES").then((notes) =>
        {
            setNotes(JSON.parse(notes))
        })
    }
    const deleteNote = async () =>
    {
        const newNotes = await notes.filter((note) => note !== singleNote)
        await AsyncStorage.setItem("NOTES", JSON.stringify(newNotes))
        .then(() => navigation.navigate("AllNotes"))
    }
    return( 
        <View style = {{backgroundColor: "#adbce6", flex: 1}}>
          <Text style = {StyleSheet.title} category = "h1">
              Notes
          </Text>
          <Text style = {{fontSize: 22, margin: 20}}>
              {singleNote}
          </Text>
          <View style = {styles.bottom}>
              <Button onPress = {deleteNote} style = {styles.Button}>
                  Delete
              </Button>
          </View>
        </View>
     );
}
function MyLogScreen()
{
    return(
        <ImageBackground
            source = {require("/Users/rjoneal/Desktop/LSAMP Research/firstPrototype/assets/Icons/SignInBackground.jpg")}
            style = {styles.background}>
        </ImageBackground>
    );
}
const styles = StyleSheet.create(
    {
    background: 
    { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: "center",
    },
    container:
    {
        flex: 1, 
        backgroundColor: "#adbce6",
        alignItems: "center", 
        justifyContent: "center"

    }, 
    item:
    {
        marginVertical: 4,
        backgroundColor: "#adbce6",
    },
    title:
    {
        textAlign: "center",
        marginTop: 50,

    },
    notes:
    {
        fontSize: 24
    }
});