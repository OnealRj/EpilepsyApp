import firebase from '../Firebase/fire.js';
import React from 'react';
import { render } from 'react-dom';
import {useState} from "react"
import { ImageBackground, StyleSheet, 
        View, Image, Text, 
        TouchableOpacity, TextInput, 
        SafeAreaView, Button, onChangeText,onChangeNumber, ColorPropType} from 'react-native';
import { ScreenContainer } from 'react-native-screens';
function Profile({navigation}) 
{
    const[firstName, setFirstName] = useState("")
    console.log(firstName)
    const[lastName, setLastName] = useState("")
    console.log(lastName)
    const[phoneNumber, setPhoneNumber] = useState("")
    console.log(phoneNumber);
    const[emergencyContact, setEmergencyContact] = useState("")
    console.log(emergencyContact);
    const[email,setEmail] = useState("")
    console.log(email);
    const[password,setPassword] = useState("")
    console.log(password);
    const[error, setError] = useState("")
    console.log(error);
    const[myInstructions, setInstructions] = useState("")

    const signUp = async() => {
        console.log("This is the firebase" + firebase.auth())
        firebase.auth().createUserWithEmailAndPassword(email,password).then((
            userCredential) =>
            {
                var userID = firebase.auth().currentUser.uid;
                console.log(userID)
                storeNewUser(userID, email, firstName, lastName, phoneNumber, emergencyContact,myInstructions)
                navigation.navigate("WelcomeScreen")
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'WelcomeScreen' }],
                  });
            }).catch((err) => {
            setError(err.message)
            console.log("this is the firebase object" + firebase.auth());
            });
    }

    function storeNewUser(userID, email, firstName, lastName, phoneNumber, emergencyContact,myInstructions)
    {
        const db = firebase.database();
        const ref = db.ref('users/' + userID);
        ref.set({
            firstName: firstName, 
            lastName: lastName, 
            email: email,
            phoneNumber: phoneNumber, 
            emergencyContact: emergencyContact,
            emergencyCareInstructions: myInstructions
          });
    }
    return<>
        <ImageBackground 
        style = {styles.background}
        source = {require("/Users/rjoneal/Desktop/LSAMP Research/firstPrototype/assets/Icons/SignInBackground.jpg")}
        >
        <SafeAreaView>
         <View style = {styles.textContainer}>
         <TextInput
                style={styles.input}
                backgroundColor = "white"
                onChangeText = {email => setEmail(email)}
                placeholder = "Please an Email Addresss"
                autoCapitalize = {"none"}
                /* Maybe Read up on how to get email entry?*/
                value={email} />
        <TextInput
                style={styles.input}
                backgroundColor = "white"
                onChangeText = {password => setPassword(password) }
                secureTextEntry = {true}
                placeholder = "Please Enter a Password"
                autoCapitalize = {"none"}
                /* Maybe Read up on how to get email entry?*/
                value={password} />
            <TextInput
                    style={styles.input}
                    backgroundColor = "white"
                    onChangeText = {firstName => setFirstName(firstName)}
                    placeholder = "Please Enter First Name"
                    value={firstName} 
                />
                <TextInput
                    style={styles.input}
                    backgroundColor = "white"
                    onChangeText = {lastName => setLastName(lastName)}
                    value= {lastName}
                    placeholder= "Please Enter Last Name"
                />
                <TextInput
                    style={styles.input}
                    backgroundColor = "white"
                    onChangeText = {phoneNumber => setPhoneNumber(phoneNumber)}
                    value= {phoneNumber}
                    placeholder="Please Enter your Phone Numbner"
                    /* Maybe Read up on how to get phone number entry?*/
                />
                <TextInput
                    style={styles.input}
                    backgroundColor = "white"
                    onChangeText = {emergencyContact => setEmergencyContact(emergencyContact)}
                    value= {emergencyContact}
                    placeholder="Please enter the name of your emergency contact"
                    /*This could be useful information that could be placed in a data base!  */
                />
                <TextInput
                        style = {styles.emergency}
                        multiline = {true}
                        onChangeText={myInstructions => setInstructions(myInstructions)}
                        value={myInstructions}
	                    placeholder="Please enter your emergency care instructions!"/>
                <TouchableOpacity
                    style={styles.loginScreenButton}
                    underlayColor='#fff'
                    onPress ={() => signUp()}>
                    <Text style={styles.loginText}>Sign Up</Text>
                </TouchableOpacity> 
                {
                    error?
                    <Text style = {{color: "white"}}>{error}</Text>:null
                }
            </View>
        </SafeAreaView>
        </ImageBackground>
    </>
}
const styles = StyleSheet.create(
{
    textContainer:
    {
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    input: 
    {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
        borderWidth: 1,
        borderRadius: 20, 
    },
    background: 
    { 
        flex: 1, 
        justifyContent: 'center',
        alignItems: "center",
    },
    loginScreenButton:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#add8e6',
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'black'
      },
      emergency:
      { 
        height: 40,
        backgroundColor: 'white',
        borderColor: 'gray', 
        borderWidth: 1,
    }
});
export default Profile;