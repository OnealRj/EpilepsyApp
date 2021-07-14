import CreateNote from "./CreateLog"
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from "../Firebase/fire";
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import React,{useState} from 'react';
import {Divider, List, ListItem, Text, Button, Navigator, Screen} from '@ui-kitten/components';
import { ImageBackground, StyleSheet, View} from 'react-native';

    export default function AllNotes()
    {
        const[notes, setNotes] = useState([])
        const navigation = useNavigation()
        useFocusEffect(
            React.useCallback(() => {
                getNotes()
            }, [])
        )
        const getNotes = () =>
        {
            AsyncStorage.getItem("NOTES").then((notes) =>  {
                setNotes(JSON.parse(notes))
            })
        }
        
        const renderItem = ({ item, index }) =>(
            <ListItem
              style = {styles.NoteContainer}
              title={<Text category = "h5" > {item} </Text>}
              onPress = {() => navigation.navigate("Note", {
                  singleNote: item
              })}
            />
          )
        const go = () => (
            navigation.navigate("Create")
        )
        
        return( 
            <View style = {{flex:1}}>
                <Text style = {styles.title} category = "h1" >
                    Logs
                </Text>
                <List
                    style={styles.container}
                    data={notes == null ? notes: notes.reverse()}
                    ItemSeparatorComponent = {Divider}
                    renderItem={renderItem}/>
                <Button style = {styles.button} appearance = "filled" onPress = {go}>
                    Create and Entry
                </Button>
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
const styles = StyleSheet.create({
    background: 
    { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: "center",
    },
    container:
    {
       fontSize: 20, 
       backgroundColor:'#add8e6',
    },
    item: 
    {
       marginVertical: 4,
       color: "black",
    },
    title:
    {
        textAlign: "center",
        marginTop: 50, 
        backgroundColor: "#add8e6",
        fontSize: 40,
        color: "#FFFFFF",
    },
    notes:
    {
        fontSize: 24,
        backgroundColor: "#e8f4f8"
    }, 
    button:
    {
        backgroundColor: "#ade6d8"
    },
    NoteContainer:
    {
        backgroundColor: "#adbce6"
    }
});