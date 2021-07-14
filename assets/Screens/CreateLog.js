import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../Firebase/fire.js';
import { useNavigation } from '@react-navigation/core';
import React, {useState} from 'react';
import { Button} from '@ui-kitten/components';
import { Dimensions, ImageBackground, StyleSheet, View, Image, Text, KeyboardAvoidingView,
    TouchableOpacity, TextInput, 
    SafeAreaView, onChangeText,onChangeNumber, ColorPropType, Platform} from 'react-native';

function CreateNote()
{
    /*
        Creates object states
    */
    const[note, setNote] = useState("")
    const navigation = useNavigation()

    const saveNote = async() => 
    {
        /* Gets value from async storage*/
        const value = await AsyncStorage.getItem("NOTES")
        /* String-ifys the notes t*/
        const n = value ? JSON.parse(value) : []
        /* pushes note to the next note*/
        n.push(note)
        /* Stringifyes the entire array! */
        await AsyncStorage.setItem("NOTES", JSON.stringify(n)).then(() => navigation.navigate("AllNotes"))
        setNote("")
    }
    return( 
        <View styles = {styles.container}>
            <TextInput 
                value = {note}
                onChangeText = {setNote}
                style = {{color: "black", fontSize: 22}}
                multiline = {true}
                autoFocus
                selectionColor = "#adbce6"
                />
            <KeyboardAvoidingView behavior = {Platform.OS === "ios" ? "height" : "padding"} style = {styles.bottom}>
                <Button style = {styles.button} appearance = "filled"  onPress = {saveNote}>
                    Create an Episode Entry
                </Button>
            </KeyboardAvoidingView>
        </View>
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
        flex: 1, 
        backgroundColor: "#adbce6",
        color: "#adbce6", 
        padding: 30, 
        paddingTop: 80,
        width: Dimensions.get("window").width
    },
    bottom: 
    {
        flex: 1, 
        justifyContent: "flex-end",
        marginBottom: 36
    },
    button:
    {
        marginBottom:30
    }
});
export default CreateNote;